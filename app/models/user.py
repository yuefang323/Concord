from .db import db
from .server import Server
from .join_server_user import JoinServerUser
from .channel import Channel
from .chat import Chat
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.Text())

    # created servers
    servers = db.relationship("Server", back_populates="user")

    # created channels
    channels = db.relationship("Channel", back_populates="user")

    @property
    def joined_servers(self):
        joined_servers = [server.to_dict() for server in Server.query.join(JoinServerUser).filter(JoinServerUser.user_id == self.id).all()]
        joined_server_user = { server.server_id: server.to_dict() for server in JoinServerUser.query.filter(JoinServerUser.user_id == self.id).all()}
        return [ { **server ,\
            "joined_date": joined_server_user[server["id"]]["joined_date"], \
            "channels": [channel.to_dict()["id"] for channel in Channel.query.filter(Channel.server_id == server["id"]).all()], \
            "users": [user.to_dict()["user_id"] for user in JoinServerUser.query.filter(JoinServerUser.server_id == server["id"], JoinServerUser.user_id != self.id).all()], \
             } for server in joined_servers]


    @property
    def other_servers(self):
        joined_servers = [server.server_id for server in JoinServerUser.query.filter(JoinServerUser.user_id == self.id).all()]
        other_servers = Server.query.filter(Server.id.notin_(joined_servers)).all()
        return [server.to_dict() for server in other_servers]


    # joined channels
    # joined_channels = db.relationship("Channel", \
    #     secondary="join(JoinServerUser, Server, JoinServerUser.server_id == Server.id)." \
    #             "join(Channel, Channel.server_id == Server.id)",\
    #     primaryjoin="and_(User.id == JoinServerUser.user_id)", \
    #     secondaryjoin="JoinServerUser.server_id == Server.id", viewonly=True)

    @property
    def joined_channels(self):
        joined_servers = [server.to_dict()["id"] for server in Server.query.join(JoinServerUser).filter(JoinServerUser.user_id == self.id).all()]
        joined_channels = [channel.to_dict() for channel in Channel.query.filter(Channel.server_id.in_(joined_servers)).all()]
        return [{**channel, \
            "chats" :[ chat.to_dict()["id"] for chat in Chat.query.filter(Chat.channel_id == channel["id"]).all()],\
                } for channel in joined_channels]

    # joined chats
    joined_chats = db.relationship("Chat", \
        secondary="join(JoinServerUser, Server, JoinServerUser.server_id == Server.id)." \
                "join(Channel, Channel.server_id == Server.id)."
                "join(Chat, Channel.id == Chat.channel_id)",\
        primaryjoin="and_(User.id == JoinServerUser.user_id)", \
        secondaryjoin="JoinServerUser.server_id == Server.id", viewonly=True)

    #chats
    chats = db.relationship("Chat", back_populates="user")

    # private channels
    private_channels = db.relationship("PrivateChannel", \
        primaryjoin="or_(User.id==PrivateChannel.user_id, User.id==PrivateChannel.friend_id)", \
        viewonly=True)

    # private chats - user is the speaker
    private_chats = db.relationship("PrivateChat", back_populates="user")

    # private chats - all chat
    all_direct_messages = db.relationship("PrivateChat", \
        secondary="join(PrivateChannel, PrivateChat, PrivateChannel.id == PrivateChat.pc_id)", \
        primaryjoin="or_(User.id == PrivateChannel.user_id, User.id == PrivateChannel.friend_id)", \
        viewonly=True)

    # Other users in same servers
    @property
    def users(self):
        # Get all the server user joined
        join_server_ids = [server.server_id for server in JoinServerUser.query.filter(JoinServerUser.user_id == self.id).all()]

        # Get ids of all other users
        other_users = [user.user_id for user in JoinServerUser.query.filter(JoinServerUser.user_id != self.id, JoinServerUser.server_id.in_(join_server_ids)).all()]

        users = User.query.filter(User.id.in_(other_users)).all()
        return [user.to_dict_limited() for user in users]



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
        }

    def to_dict_limited(self):
        return {
            'id': self.id,
            'username': self.username,
            'avatar': self.avatar,
        }

from .db import db
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
    servers = db.relationship("Server", back_populates="user", cascade="all, delete")

    # created channels
    channels = db.relationship("Channel", back_populates="user")

    # joined servers
    joined_servers = db.relationship("Server", \
        secondary="join(JoinServerUser, Server, JoinServerUser.server_id == Server.id)", \
        primaryjoin="User.id==JoinServerUser.user_id", viewonly=True)

    # joined channels
    joined_channels = db.relationship("Channel", \
        secondary="join(JoinServerUser, Server, JoinServerUser.server_id == Server.id)." \
                "join(Channel, Channel.server_id == Server.id)",\
        primaryjoin="and_(User.id == JoinServerUser.user_id)", \
        secondaryjoin="JoinServerUser.server_id == Server.id", viewonly=True)

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
    private_channels = db.relationship("PrivateChannel", primaryjoin="or_(User.id==PrivateChannel.user_id, User.id==PrivateChannel.friend_id)", viewonly=True)

    # private chats
    private_chats = db.relationship("PrivateChat", back_populates="user")


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

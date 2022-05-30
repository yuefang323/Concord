from .db import db
from .chat import Chat

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    logo = db.Column(db.Text)
    background = db.Column(db.Text)
    description = db.Column(db.Text)

    # Server-to-Joined users: many to many
    joined_users = db.relationship("User", \
        secondary="join(JoinServerUser, User, JoinServerUser.user_id == User.id)", \
        primaryjoin="Server.id == JoinServerUser.server_id")

    # Server-to-Channel: one to many
    channels = db.relationship("Channel", back_populates="server", cascade="all, delete")
    # Server-to-User: many to one
    user = db.relationship("User", back_populates="servers")

    def to_dict(self):
        channel_ids = [channel.id for channel in self.channels]
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'logo': self.logo,
            'background': self.background,
            'description': self.description,
            'channels': channel_ids,
        }

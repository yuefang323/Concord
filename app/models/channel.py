from .db import db
from .chat import Chat

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    # Channel-to-Chat: one to many
    chats = db.relationship("Chat", back_populates="channel", cascade="all, delete")
    # Channel-to-Server: many to one
    server = db.relationship("Server", back_populates="channels")
    # Channel-to-User: many to one
    user = db.relationship("User", back_populates="channels")

    def to_dict(self):
        chats = Chat.query.filter(Chat.channel_id == self.id).order_by("id").all()
        chat_ids = [chat.id for chat in chats]

        # chat_ids = [chat.id for chat in self.chats]

        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id,
            'name': self.name,
            "chats": chat_ids
        }

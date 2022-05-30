from .db import db
from datetime import datetime

class PrivateChat(db.Model):
    __tablename__ = 'private_chats'

    id = db.Column(db.Integer, primary_key=True)
    pc_id = db.Column(db.Integer, db.ForeignKey('private_channels.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "pc_id": self.pc_id,
            "user_id": self.user_id,
            "message": self.message,
            "created_at": self.created_at.isoformat()
        }

    # many to one Prv chats -> Prv channel
    private_channel = db.relationship("PrivateChannel", back_populates="private_chats")

    # many to one prv chats -> user
    user = db.relationship("User", back_populates="private_chats")

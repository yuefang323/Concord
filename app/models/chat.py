from .db import db
from datetime import datetime

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.Text(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=True)

    # Chat-to-Channel: many to one
    channel = db.relationship("Channel", back_populates="chats")
    # Chat-to-User: many to one
    user = db.relationship("User", back_populates="chats")

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'message': self.message,
            'created_at': self.created_at.isoformat(),
        }

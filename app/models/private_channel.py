from .db import db

class PrivateChannel(db.Model):
    __tablename__ = 'private_channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # one to many prv channel -> prv chats
    private_chats = db.relationship("PrivateChat", back_populates="private_channel", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "prvChats": [chat.id for chat in self.private_chats]
        }


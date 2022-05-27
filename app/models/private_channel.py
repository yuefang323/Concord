from .db import db

class PrivateChannel(db.Model):
    __tablename__ = 'private_channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id
        }

    # one to many prv channel -> prv chats
    private_chats = db.relationship("PrivateChat", back_populates='private_channel')

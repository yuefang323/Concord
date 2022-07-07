from .db import db
from datetime import datetime

class JoinServerUser(db.Model):
    __tablename__ = "join_servers_users"

    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    joined_date = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)


    def to_dict(self):
        return {
            'server_id': self.server_id,
            'user_id': self.user_id,
            'joined_date': self.joined_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
        }

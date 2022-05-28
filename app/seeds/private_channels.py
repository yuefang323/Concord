from app.models import db, PrivateChannel

def seed_private_channels():
    DM1 = PrivateChannel(
      user_id=1,
      friend_id=2,
    )

    DM2 = PrivateChannel(
      user_id=1,
      friend_id=3,
    )

    db.session.add(DM1)
    db.session.add(DM2)
    db.session.commit()

def undo_private_channels():
    db.session.execute('TRUNCATE private_channels RESTART IDENTITY CASCADE;')
    db.session.commit()
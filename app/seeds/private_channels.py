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
    
    DM3 = PrivateChannel(
      user_id=1,
      friend_id=6,
    )
    
    DM4 = PrivateChannel(
      user_id=2,
      friend_id=1,
    )
    
    DM5 = PrivateChannel(
      user_id=2,
      friend_id=4,
    )
    
    DM6 = PrivateChannel(
      user_id=3,
      friend_id=1,
    )
    
    DM7 = PrivateChannel(
      user_id=4,
      friend_id=2,
    )
    
    DM8 = PrivateChannel(
      user_id=4,
      friend_id=5,
    )
    
    DM9 = PrivateChannel(
      user_id=5,
      friend_id=4,
    )

    DM10 = PrivateChannel(
      user_id=6,
      friend_id=1,
    )

    db.session.add(DM1)
    db.session.add(DM2)
    db.session.add(DM3)
    db.session.add(DM4)
    db.session.add(DM5)
    db.session.add(DM6)
    db.session.add(DM7)
    db.session.add(DM8)
    db.session.add(DM9)
    db.session.add(DM10)

    db.session.commit()

def undo_private_channels():
    db.session.execute('TRUNCATE private_channels RESTART IDENTITY CASCADE;')
    db.session.commit()

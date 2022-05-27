from app.models import db, Channel

def seed_channels():
    general = Channel(
        server_id=1,
        user_id=1,
        name='general',
    )

    music = Channel(
        server_id=1,
        user_id=1,
        name='music',
    )

    games = Channel(
        server_id=3,
        user_id=1,
        name='games',
    )

    db.session.add(general)
    db.session.add(music)
    db.session.add(games)
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

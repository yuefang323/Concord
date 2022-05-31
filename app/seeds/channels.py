from app.models import db, Channel

def seed_channels():
    
    channel_list = []
    
    for i in range(1, 10):
        if i < 4:
            user_id = 1
        elif i < 6:
            user_id = 2
        else: user_id = i - 3
        
        general = Channel(
            server_id=i,
            user_id=user_id,
            name='general',
        )

        music = Channel(
            server_id=i,
            user_id=user_id,
            name='music',
        )

        games = Channel(
            server_id=i,
            user_id=user_id,
            name='games',
        )
        channel_list.append(general)
        channel_list.append(music)
        channel_list.append(games)
    
    
    for c in channel_list:
        db.session.add(c)
    
    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

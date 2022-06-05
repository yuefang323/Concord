from app.models import db, Chat

def seed_chats():
    msg1 = Chat(
        channel_id=1,
        user_id=1,
        message="Hi, i'm Demo nice to meet you!",
    )

    msg2 = Chat(
        channel_id=1,
        user_id=4,
        message="Nice to meet you Demo, my name is Frances",
    )

    msg3 = Chat(
        channel_id=1,
        user_id=3,
        message="Hi, i'm bobbie nice to meet you all!",
    )

    msg4 = Chat(
        channel_id=1,
        user_id=1,
        message="Welcome! bobbie!",
    )

    msg5 = Chat(
        channel_id=1,
        user_id=4,
        message="Hi, bobbie!",
    )
    
    msg6 = Chat(
        channel_id=1,
        user_id=6,
        message="Hi, everyone! I'm Lincoln.",
    )
    
    msg7 = Chat(
        channel_id=1,
        user_id=5,
        message="Hello, all. I'm Fang. Nice to meet you all!",
    )
    
    msg8 = Chat(
        channel_id=1,
        user_id=1,
        message="Wow! What a nice day today!",
    )

    db.session.add(msg1)
    db.session.add(msg2)
    db.session.add(msg3)
    db.session.add(msg4)
    db.session.add(msg5)
    db.session.add(msg6)
    db.session.add(msg7)
    db.session.add(msg8)
    db.session.commit()

def undo_chats():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

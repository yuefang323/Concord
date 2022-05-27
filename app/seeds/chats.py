from app.models import db, Chat

def seed_chats():
    msg1 = Chat(
        channel_id=1
        user_id=1
        message="Hi, i'm Demo nice to meet you!"
    )

    msg2 = Chat(
        channel_id=1
        user_id=2
        message="Nice to meet you Demo, my name is marnie"
    )

     msg3 = Chat(
        channel_id=1
        user_id=3
        message="Hi, i'm bobbie nice to meet you all!"
    )

    msg4 = Chat(
        channel_id=1
        user_id=1
        message="Welcome! bobbie!"
    )

    msg5 = Chat(
        channel_id=1
        user_id=2
        message="Hi, bobbie!"
    )


def undo_chats():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')

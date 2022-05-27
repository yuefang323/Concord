from app.models import db, PrivateChat

def seed_private_chats():
    # demo to marnie
    prv_msg1 = PrivateChat(
        pc_id=1,
        user_id=1,
        message="How was your day marnie?",
    )

    # marnie to demo
    prv_msg2 = PrivateChat(
        pc_id=1,
        user_id=2,
        message="Good, how about you Demo?",
    )

    # demo to bobbie
    prv_msg3 = PrivateChat(
        pc_id=2,
        user_id=1,
        message="What is your favorite food bobbie?",
    )

    # bobbie to demo
    prv_msg4 = PrivateChat(
        pc_id=2,
        user_id=3,
        message="My favorite food to eat is pasta",
    )

    db.session.add(prv_msg1)
    db.session.add(prv_msg2)
    db.session.add(prv_msg3)
    db.session.add(prv_msg4)
    db.session.commit()

def undo_private_chats():
    db.session.execute('TRUNCATE private_chats RESTART IDENTITY CASCADE;')
    db.session.commit()

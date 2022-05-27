from app.models import db, PrivateChat

def seed_private_chats():
    prv_msg1 =

    prv_msg2 = 

def undo_private_chats():
    db.session.execute('TRUNCATE private_chats RESTART IDENTITY CASCADE;')

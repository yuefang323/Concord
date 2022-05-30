from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar='https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_minnie_ddt-16970_3_4a2aa999.jpeg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar='https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-1eqn5zt_68a0ef78.jpeg?region=0,0,300,300')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XNTnjezNRbpXlCmfQG_VzEBWB3brmJ7hyQ&usqp=CAU')
    frances = User(
        username='frances', email='frances@aa.io', password='password', avatar='')
    fang = User(
        username='fang', email='fang@aa.io', password='password', avatar='')
    lincoln = User(
        username='lincoln', email='lincoln@aa.io', password='password', avatar='')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(frances)
    db.session.add(fang)
    db.session.add(lincoln)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

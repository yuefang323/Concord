from app.models import db, JoinServerUser

def seed_join_servers_users():
    demo = JoinServerUser(
        server_id=1,
        user_id=1,
    )

    marnie = JoinServerUser(
        server_id=1,
        user_id=2,
    )

    bobbie = JoinServerUser(
        server_id=1,
        user_id=3,
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_join_servers_users():
    db.session.execute('TRUNCATE join_servers_users RESTART IDENTITY CASCADE;')
    db.session.commit()

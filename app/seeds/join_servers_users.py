from app.models import db, JoinServerUser

def seed_join_servers_users():
    demo = JoinServerUser(
        server_id=1
        user_id=1
    )

    marnie = JoinServerUser(
        server_id=1
        user_id=2
    )

    bobbie = JoinServerUser(
        server_id=1
        user_id=3
    )

def undo_join_servers_users():
    db.session.execute('TRUNCATE join_servers_users RESTART IDENTITY CASCADE;')

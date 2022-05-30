from app.models import db, JoinServerUser

def seed_join_servers_users():
    demo = JoinServerUser(
        server_id=1,
        user_id=1,
    )

    demo2 = JoinServerUser(
        server_id=2,
        user_id=1,
    )
    
    demo3 = JoinServerUser(
        server_id=3,
        user_id=1,
    )
    
    demo4 = JoinServerUser(
        server_id=4,
        user_id=1,
    )
    demo5 = JoinServerUser(
        server_id=7,
        user_id=1,
    )

    marnie = JoinServerUser(
        server_id=4,
        user_id=2,
    )
    
    marnie2 = JoinServerUser(
        server_id=5,
        user_id=2,
    )
    
    marnie3 = JoinServerUser(
        server_id=8,
        user_id=2,
    )

    bobbie = JoinServerUser(
        server_id=1,
        user_id=3,
    )
    
    bobbie2 = JoinServerUser(
        server_id=6,
        user_id=3,
    )
    
    frances = JoinServerUser(
        server_id=1,
        user_id=4,
    )
    
    frances2 = JoinServerUser(
        server_id=7,
        user_id=4,
    )
    
    fang = JoinServerUser(
        server_id=1,
        user_id=5,
    )
    
    fang2 = JoinServerUser(
        server_id=8,
        user_id=5,
    )
    
    lincoln = JoinServerUser(
        server_id=1,
        user_id=6,
    )
    
    lincoln2 = JoinServerUser(
        server_id=9,
        user_id=6,
    )


    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(marnie)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(bobbie)
    db.session.add(bobbie2)
    db.session.add(frances)
    db.session.add(frances2)
    db.session.add(fang)
    db.session.add(fang2)
    db.session.add(lincoln)
    db.session.add(lincoln2)
    
    db.session.commit()

def undo_join_servers_users():
    db.session.execute('TRUNCATE join_servers_users RESTART IDENTITY CASCADE;')
    db.session.commit()

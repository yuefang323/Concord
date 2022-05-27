from app.models import db, Server

def seed_servers():
    demo_server = Server(
        user_id=1,
        name='Demo',
        logo='',
        background='',
        description='server demo.',
    )

    anon_server = Server(
        user_id=1,
        name='Anonymous Server.',
        logo='',
        background='',
        description='server for anonymous',
    )

    guest_server = Server(
        user_id=1,
        name='Guest Server',
        logo='',
        background='',
        description='server for guests.',
    )



def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')

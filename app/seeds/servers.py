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
        logo='https://i.pinimg.com/736x/a6/5b/7b/a65b7be0b806d5e94dc6b4e146c11802.jpg',
        background='',
        description='server for anonymous',
    )

    guest_server = Server(
        user_id=1,
        name='Guest Server',
        logo='',
        background='https://www.seekpng.com/png/small/127-1274078_mickey-mouse-friends-dog-from-mickey-mouse.png',
        description='server for guests.',
    )
    
    marnie_server = Server(
        user_id=2,
        name='Marnie Server',
        logo='',
        background='',
        description="marnie's 1st server.",
    )
    
    marnie_server2 = Server(
        user_id=2,
        name='Marnie Server 2',
        logo='',
        background='',
        description="marnie's 2nd server.",
    )
    
    bobbie_server = Server(
        user_id=3,
        name='Bobbie Server',
        logo='',
        background='',
        description="bobbie's 1st server.",
    )
    
    frances_server = Server(
        user_id=4,
        name='Frances Server',
        logo='https://store.playstation.com/store/api/chihiro/00_09_000/container/ZA/en/99/EP0177-NPEB01427_00-AVCASTLEOF000008/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720',
        background='',
        description="frances 1st server.",
    )
    
    fang_server = Server(
        user_id=5,
        name='Fang Server',
        logo='https://i.etsystatic.com/18318895/r/il/f69f58/1648035069/il_570xN.1648035069_sce1.jpg',
        background='',
        description="fang's 1st server.",
    )
    
    lincoln_server = Server(
        user_id=6,
        name='Lincoln Server',
        logo='https://avatarfiles.alphacoders.com/632/thumb-63289.jpg',
        background='',
        description="lincoln's 1st server.",
    )
    

    db.session.add(demo_server)
    db.session.add(anon_server)
    db.session.add(guest_server)
    db.session.add(marnie_server)
    db.session.add(marnie_server2)
    db.session.add(bobbie_server)
    db.session.add(frances_server)
    db.session.add(fang_server)
    db.session.add(lincoln_server)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()

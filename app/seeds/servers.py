from app.models import db, Server

def seed_servers():
    demo_server = Server(
        user_id=1,
        name='Demo',
        logo='https://go-concord.s3.amazonaws.com/ava-127-1274078_mickey-mouse-friends-dog-from-mickey-mouse.png',
        background='https://go-concord.s3.amazonaws.com/bg-1920x1200DisneyJr-Pattern-wallpaper-613x383.webp',
        description='server demo.',
    )

    anon_server = Server(
        user_id=1,
        name='Anonymous Server.',
        logo='https://go-concord.s3.amazonaws.com/ava-a65b7be0b806d5e94dc6b4e146c11802.jpeg',
        background='https://go-concord.s3.amazonaws.com/bg-5bd38fa17dd68-wallpaper-preview.jpeg',
        description='server for anonymous',
    )

    guest_server = Server(
        user_id=1,
        name='Guest Server',
        logo='https://go-concord.s3.amazonaws.com/ava-il_570xN.1648035069_sce1.webp',
        background='https://go-concord.s3.amazonaws.com/bg-751589-mickey-mouse-800x450.jpeg',
        description='server for guests.',
    )

    marnie_server = Server(
        user_id=2,
        name='Marnie Server',
        logo='https://go-concord.s3.amazonaws.com/ava-image.jpeg',
        background='https://go-concord.s3.amazonaws.com/bg-Crop-for-Feature.jpeg',
        description="marnie's 1st server.",
    )

    marnie_server2 = Server(
        user_id=2,
        name='Marnie Server 2',
        logo='https://go-concord.s3.amazonaws.com/ava-onward-poster-today-200222-square-03.jpeg',
        background='https://go-concord.s3.amazonaws.com/bg-da2ffe3d-5817-4610-a3f0-90f9c2c90b83_1.0c142c5d562947bf53413cd85d2192c9.jpeg',
        description="marnie's 2nd server.",
    )

    bobbie_server = Server(
        user_id=3,
        name='Bobbie Server',
        logo='https://go-concord.s3.amazonaws.com/ava-Screen+Shot+2022-06-03+at+3.38.54+PM.png',
        background='https://go-concord.s3.amazonaws.com/bg-s-l640.jpeg',
        description="bobbie's 1st server.",
    )

    frances_server = Server(
        user_id=4,
        name='Frances Server',
        logo='https://go-concord.s3.amazonaws.com/ava-thumb-63289.jpeg',
        background='https://go-concord.s3.amazonaws.com/bg-Uao2zf.jpeg',
        description="frances 1st server.",
    )

    fang_server = Server(
        user_id=5,
        name='Fang Server',
        logo='https://go-concord.s3.amazonaws.com/ava-Screen+Shot+2022-06-03+at+3.42.31+PM.png',
        background='https://go-concord.s3.amazonaws.com/bg-zt4G2w.webp',
        description="fang's 1st server.",
    )

    lincoln_server = Server(
        user_id=6,
        name='Lincoln Server',
        logo='https://go-concord.s3.amazonaws.com/ava-Screen+Shot+2022-06-03+at+3.42.57+PM.png',
        background='https://go-concord.s3.amazonaws.com/Free-Mickey-Mouse-Easter-Wallpaper-Red-Color.jpeg',
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

from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, Chat, Channel
from flask_login import current_user
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://go-concord.herokuapp.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle broadcase messages. It will send to all connected sockets
# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)

# User join room as soons as they click on the channel tab
@socketio.on("join_channels")
def join_channels(channel_id_list):
    for channel_id in channel_id_list:
        join_room(channel_id)
        print("*************joined channel", channel_id)

@socketio.on("leave_channels")
def leave_channels(channel_id_list):
    for channel_id in channel_id_list:
        leave_room(channel_id)
        print("*************left channel", channel_id)


# receive any message with event "send_chat"
@socketio.on("send_chat")
def send_chat(data):
    user_id = current_user.id
    print("***************************", data["channel_id"])
    # create "created_at" and create class instance "chat"
    chat = Chat(user_id=user_id, channel_id=data["channel_id"],
                message=data["chat"])

    # # add to database
    db.session.add(chat)
    db.session.commit()

    channel = Channel.query.get(data["channel_id"])

    # transfer chat object back to frontend,
    # so frontent will have the new id and can add to redux store
    emit("receive_message", {
         "chat": chat.to_dict(), "channel": channel.to_dict()},
         room=data["channel_id"],
         to=data["channel_id"],
         )

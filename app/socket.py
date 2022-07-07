from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, Chat, Channel, PrivateChat, PrivateChannel
from flask_login import current_user
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://go-concord.herokuapp.com',
        'https://go-concord.herokuapp.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)



@socketio.on("join_channel")
def join_channels(channel_id):
    join_room(channel_id)


@socketio.on("leave_channel")
def leave_channels(channel_id):
    leave_room(channel_id)

@socketio.on("leave_channels")
def leave_channels(channel_id_list):
    for channel_id in channel_id_list:
        leave_room(channel_id)


# receive any message with event "send_chat"
@socketio.on("send_chat")
def send_chat(data):
    user_id = current_user.id
    # create "created_at" and create class instance "chat"
    chat = Chat(user_id=user_id, channel_id=data["channel_id"],
                message=data["chat"])

    # add to database
    db.session.add(chat)
    db.session.commit()

    channel = Channel.query.get(data["channel_id"])

    print(channel.to_dict())
    # transfer chat object back to frontend,
    # so frontent will have the new id and can add to redux store
    emit("receive_message", {
         "chat": chat.to_dict(), "channel": channel.to_dict()},
         to=data["channel_id"],
         broadcast=True
         )

@socketio.on("edit_chat")
def edit_chat(data):
    # user_id = current_user.id

    chat = Chat.query.get(data["chat_id"])

    # if chat.user_id == user_id:
    #     chat.message = data["message"]
    #     db.session.commit()

    emit("edit_chat", {"chat": chat.to_dict()}, to=data["channel_id"],
        broadcast=True)


@socketio.on("delete_chat")
def delete_chat(data):
    chat = Chat.query.get(data["chat_id"])

    db.session.delete(chat)
    db.session.commit()

    channel = Channel.query.get(data["channel_id"])

    emit("delete_chat", {
        "channel": channel.to_dict(),
        "chat_id": data["chat_id"],
    }, to=data["channel_id"],
         broadcast=True)

@socketio.on("send_prv_chat")
def send_prv_chat(data):
    user_id = current_user.id
    prv_chat = PrivateChat(user_id=user_id, pc_id=data["pc_id"], message=data["prvChat"])

    db.session.add(prv_chat)
    db.session.commit()

    prv_channel = PrivateChannel.query.get(data["pc_id"])

    print(prv_channel.to_dict())
    emit("receive_prv_message", {
        "prv_chat": prv_chat.to_dict(), "prv_channel": prv_channel.to_dict()},
        to=data["pc_id"],
        broadcast=True,
        )


# Error handler
@socketio.on_error_default
def default_error_handler(e):
    print(request.event["message"])
    print(request.event["args"])

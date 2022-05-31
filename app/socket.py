from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db
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


# receive any message with event "send_message"
@socketio.on("send_message")
def send_message(data):
    pass
    # create "updated" and create class instance "chat"
    # updated = datetime.now()
    # chat = Chat(user_id=data["user_id"], channel_id=data["channel_id"],
    #             message=data["message"], updated=updated)

    # add to database
    # db.session.add(chat)
    # db.session.commit()

    # transfer chat object back to frontend,
    # so frontent will have the new id and can add to redux store
    # emit("receive_message", {
    #      "message": data["message"],
    #      "user_id": data["user_id"],
    #      "channel_id": data["channel_id"],
    #      "id": chat.id,
         # python date object cannot be transfered through JSON. Translate to isoformat
        #  "updated": updated.isoformat()}, to=data["channel_id"])

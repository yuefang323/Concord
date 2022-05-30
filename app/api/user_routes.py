from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server, JoinServerUser

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()

# Get current login user's all servers, channels and chats and private chats
@user_routes.route('/all')
@login_required
def get_user_all_info():
    curr_user_id = current_user.id
    user = User.query.get(curr_user_id)



    servers = [server.to_dict() for server in Server.query.all()]

    joined_channels = user.joined_channels

    joined_chats = [chat.to_dict() for chat in user.joined_chats]

    joined_private_channels = [pv_channel.to_dict() for pv_channel in user.private_channels]

    joined_private_chats = [pv_chat.to_dict() for pv_chat in user.all_direct_messages]

    join_server_user = [join.to_dict() for join in JoinServerUser.query.filter(JoinServerUser.user_id == user.id).all()]

    joined_server_memebers = user.users

    return {
        "servers": servers,
        "channels": joined_channels,
        "chats": joined_chats,
        "prvChannels": joined_private_channels,
        "prvChats": joined_private_chats,
        "joinServers": join_server_user,
        "users": joined_server_memebers
        }

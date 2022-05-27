from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server, JoinServerUser

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Get current login user's all servers, channels and chats and private chats
@user_routes.route('/all')
@login_required
def get_user_all_info():
    curr_user_id = current_user.id
    # print(".....", curr_user_id)
    user = User.query.get(curr_user_id)
    joined_servers = [server.to_dict() for server in user.joined_servers]
    joined_servers_id = [server.id for server in user.joined_servers]
    # print("......", joined_servers)
    joined_channels = [channel.to_dict() for channel in user.joined_channels]
    joined_chats = [chat.to_dict() for chat in user.joined_chats]
    joined_private_channels = [pv_channel.to_dict() for pv_channel in user.private_channels]
    joined_private_chats = [pv_chat.to_dict() for pv_chat in user.private_chats]

    other_servers = Server.query.filter(Server.id not in joined_servers_id).all()
    joined_server_memebers = User.query.join(JoinServerUser).filter(JoinServerUser.server_id in joined_servers_id).all()
    
    
    return {
        "servers": joined_servers,  
        "channels": joined_channels,
        "chats": joined_chats,
        "prv_channels": joined_private_channels,
        "prv_chats": joined_private_chats,
        "other_servers": other_servers,
        "users": joined_server_memebers
        }
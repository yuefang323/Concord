from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, JoinServerUser, db
from app.forms import EditUserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

    join_server_user = [join.to_dict() for join in JoinServerUser.query.filter(JoinServerUser.user_id == user.id).order_by(JoinServerUser.joined_date.desc()).all()]

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

# edit user
@user_routes.route('/<int:user_id>', methods=["PUT"])
@login_required
def edit_user_info(user_id):
    form = EditUserForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(user_id)
        user.username = form.data["username"]
        user.email = form.data["email"]
        user.avatar = form.data["avatar"]
        db.session.commit()

        return { "user": user.to_dict() }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

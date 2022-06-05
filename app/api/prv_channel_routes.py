from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, PrivateChannel, PrivateChat, User
from app.forms import NewPrvChannelForm

prv_channel_routes = Blueprint("prv_channels", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all private channels
@prv_channel_routes.route("/")
def get_prv_channels():
    user = User.query.get(current_user.id)
    return {
        "prv_channels": [pv_channel.to_dict() for pv_channel in user.private_channels]
    }

# Add new private channel
@prv_channel_routes.route("/new", methods=["GET", "POST"])
@login_required
def new_channel():
    """
    Create new private channel
    # """
    form = NewPrvChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        friend_id = form.data["friend_id"]
        new_prv_channel = PrivateChannel(user_id=user_id, friend_id=friend_id)

        db.session.add(new_prv_channel)
        db.session.commit()

    return {
        "prv_channel": new_prv_channel.to_dict(),
        }

# Get private channel
@prv_channel_routes.route("/<int:prvChannelId>", methods=["GET"])
@login_required
def get_channel(prvChannelId):

    prv_channel = PrivateChannel.query.get(prvChannelId)
    prv_chats = PrivateChat.query.filter(PrivateChat.pc_id == prvChannelId).all()

    return {
        "prv_channel": prv_channel.to_dict(),
        "prv_chats" : [chat.to_dict() for chat in prv_chats],
    }

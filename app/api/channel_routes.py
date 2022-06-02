from flask import Blueprint, jsonify, session, request, json
from flask_login import current_user, login_required
from app.models import db, Channel, Server, Chat
from app.forms import NewChannelForm, EditChannelForm

channel_routes = Blueprint("channels", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Add new channel
@channel_routes.route("/<int:serverId>/new", methods=["GET", "POST"])
@login_required
def new_channel(serverId):
    """
    Create new channel
    # """
    form = NewChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        name = form.data["name"]
        new_channel = Channel(user_id=user_id, server_id=serverId, name=name)
        db.session.add(new_channel)
        db.session.commit()
        updatedServer = Server.query.get(serverId)

        return {
            "channel": new_channel.to_dict(),
            "server": updatedServer.to_dict()
            };

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get channel
@channel_routes.route("/<int:channelId>", methods=["GET"])
@login_required
def get_channel(channelId):

    channel = Channel.query.get(channelId)
    chats = Chat.query.filter(Chat.channel_id == channelId).all()

    return {
        "channel": channel.to_dict(),
        "chats" : [chat.to_dict() for chat in chats]
    }


# Update a channel
@channel_routes.route("/<int:serverId>/<int:channelId>", methods=["GET", "PUT"])
@login_required
def edit_channel(serverId, channelId):

    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel.query.get(channelId)
        channel.name = form.data["name"]

        db.session.commit()

        return {"channel": channel.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete a channel
@channel_routes.route("/<int:serverId>/<int:channelId>", methods=["DELETE"])
@login_required
def delete_channel(serverId, channelId):

    channel = Channel.query.get(channelId)

    data = json.loads(request.data)
    name = data["name"]
    if channel.name == name:
        db.session.delete(channel)
        db.session.commit()
        return {
            "channelId": channelId,
        }

    return {'errors': ["Channel name does not match"]}, 401

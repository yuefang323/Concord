from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Channel, Server
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

@channel_routes.route("/<int:serverId>/<int:channelId>", methods=["GET", "POST"])
@login_required

def edit_channel(serverId, channelId):
    
    print("serverId", serverId)
    print("channelId", channelId)

    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(serverId)
        channel = Channel.query.get(channelId)
        channel.name = form.data["name"]
        
        print("......", server)
        print("xxxxxx", channel)

        db.session.commit()

        return {"channel": server.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
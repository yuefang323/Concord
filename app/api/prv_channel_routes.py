from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, PrivateChannel
from app.forms import NewChannelForm

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

# Add new channel
@prv_channel_routes.route("/new", methods=["GET", "POST"])
@login_required
def new_channel(friendId):
    """
    Create new private channel
    # """
    form = NewChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        new_prv_channel = PrivateChannel(user_id=user_id, friend_id=friendId)
        db.session.add(new_prv_channel)
        db.session.commit()
        
        return {
            "prv_channel": new_prv_channel.to_dict(),
            };

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
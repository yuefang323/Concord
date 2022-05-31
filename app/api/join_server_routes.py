from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, JoinServerUser, Channel, Chat, Server, User
from app.forms import JoinServerForm

join_server_routes = Blueprint("join_servers", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Join new server
@join_server_routes.route("/new", methods=["POST"])
@login_required
def join_server():
    """
    Current user join a serer
    """
    form = JoinServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        server_id = form.data["server_id"]

        newJoin = JoinServerUser(user_id=user_id, server_id=server_id)
        db.session.add(newJoin)
        db.session.commit()

        # Get channels associated with server
        channels = Channel.query.filter(Channel.server_id == server_id).all()

        # Get chat associated with server
        channel_ids = Server.query.filter(Server.id == server_id).one().to_dict()["channels"]
        chats = Chat.query.filter(Chat.channel_id.in_(channel_ids)).all()

        # Get users associated with server
        user_ids = Server.query.filter(Server.id == server_id).one().to_dict()["users"]
        users = User.query.filter(User.id.in_(user_ids)).all()

        return {
            "joinServer": newJoin.to_dict(),
            "channels":[channel.to_dict() for channel in channels],
            "chats": [chats.to_dict() for chat in chats],
            "users": [user.to_dict_limited() for user in users]
        }
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Leave server
@join_server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def leave_server(server_id):
    join = JoinServerUser.query.filter(JoinServerUser.server_id == server_id, JoinServerUser.user_id == current_user.id).one()
    db.session.delete(join)
    db.session.commit()

    server = Server.query.filter(Server.id == server_id).one()

    return {
        "server": server.to_dict(),
    }

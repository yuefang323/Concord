from flask import Blueprint, jsonify, session, request, g, json
from flask_login import current_user, login_required
from wtforms.fields.core import Label
from app.models import db, Server, JoinServerUser, Channel, Chat
from app.forms import NewServerForm, EditServerForm

server_routes = Blueprint("servers", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all servers
@server_routes.route("/")
def get_servers():
    servers = Server.query.all()
    return {
        "servers": [server.to_dict() for server in servers],
    }


# Add new server
@server_routes.route("/new", methods=["POST"])
@login_required
def new_server():
    """
    Create new server
    """
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        name = form.data["name"]

        # Created new server
        new_server = Server(user_id=user_id, name=name)
        db.session.add(new_server)
        db.session.commit()

        # Server owner automatically join server
        new_join = JoinServerUser(user_id=user_id, server_id=new_server.id)
        db.session.add(new_join)
        db.session.commit()

        # add default channel channel
        new_channel = Channel(server_id=new_server.id, user_id=user_id, name="general")
        db.session.add(new_channel)
        db.session.commit()

        return {
            "server": new_server.to_dict(),
            "joinServer": new_join.to_dict(),
            "channel": new_channel.to_dict(),
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get / Edit server
@server_routes.route("/<int:server_id>", methods=["GET", "PUT"])
@login_required
def edit_server(server_id):
    if request.method == "GET":
        server = Server.query.get(server_id)
        channels = Channel.query.filter(Channel.server_id == server_id).all()
        join_server_user = [join.to_dict() for join in JoinServerUser.query.filter(JoinServerUser.user_id == current_user.id).order_by(JoinServerUser.joined_date.desc()).all()]

        return {
            "server": server.to_dict(),
            "channels": [channel.to_dict() for channel in channels],
            "joinServers": join_server_user,
        }


    if request.method == "PUT":
        form = EditServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server = Server.query.get(server_id)
            server.name = form.data["name"]
            server.description = form.data["description"]
            if form.data["user_id"]:
                server.user_id = form.data["user_id"]
            if form.data["logo"]:
                server.logo = form.data["logo"]
            if form.data["background"]:
                server.background = form.data["background"]
            db.session.commit()

            return {"server": server.to_dict()}

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    return {"errors": "invalid method"}


# Delete server logo
@server_routes.route("/<int:server_id>/logo", methods=["DELETE"])
@login_required
def remove_server_logo(server_id):

    server = Server.query.get(server_id)
    server.logo = ""
    db.session.commit()

    return {"server": server.to_dict()}

# Delete Server
@server_routes.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server(server_id):
    server = Server.query.get(server_id)
    data = json.loads(request.data)
    name = data["name"]
    if server.name == name:
        channels = Channel.query.filter(Channel.server_id == server_id).all()
        channel_ids = [channel.to_dict()["id"] for channel in channels]
        chats = Chat.query.filter(Chat.channel_id.in_(channel_ids)).all()
        chat_ids = [chat.to_dict()["id"] for chat in chats]

        JoinServerUser.query.filter(JoinServerUser.server_id==server_id).delete()
        db.session.delete(server)
        db.session.commit()
        return {
            "serverId": server_id,
            "channels": channel_ids,
            "chats": chat_ids,
        }

    return {'errors': ["Server name does not match"]}, 401

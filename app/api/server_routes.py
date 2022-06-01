from flask import Blueprint, jsonify, session, request, g
from flask_login import current_user, login_required
from wtforms.fields.core import Label
from app.models import db, Server, JoinServerUser, Channel
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
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit server
@server_routes.route("/<int:server_id>", methods=["PUT"])
@login_required
def edit_server(server_id):

    # with app.app_context():
    #     g.server_id = server_id
    form = EditServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(server_id)
        server.name = form.data["name"]
        server.description = form.data["description"]
        db.session.commit()

        return {"server": server.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route("/<int:server_id>/logo", methods=["DELETE"])
@login_required
def remove_server_logo(server_id):

    server = Server.query.get(server_id)
    server.logo = ""
    db.session.commit()

    return {"server": server.to_dict()}

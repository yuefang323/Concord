from flask import Blueprint, jsonify, session, request, json
from flask_login import current_user, login_required
from app.models import db, PrivateChannel, PrivateChat
from app.forms import EditPrvChatForm

prv_chat_routes = Blueprint("prv_chats", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@prv_chat_routes.route("/<int:prvChatId>", methods=["GET", "PUT", "DELETE"])
@login_required
def edit_delete_prv_chat(prvChatId):
    if request.method == "PUT":
        form = EditPrvChatForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            prv_chat = PrivateChat.query.get(prvChatId)
            prv_chat.message = form.data["message"]
            db.session.commit()
            return { "prv_chat": prv_chat.to_dict() }

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        prv_chat = PrivateChat.query.get(prvChatId)
        pc_id = prv_chat.pc_id
        db.session.delete(prv_chat)
        db.session.commit()

        prv_channel = PrivateChannel.query.get(pc_id)

        return { "prv_channel": prv_channel.to_dict() }
    # return { "greeting" : 'hi' }

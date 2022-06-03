from flask import Blueprint, jsonify, session, request, json
from flask_login import current_user, login_required
from app.models import db, Channel, Chat
from app.forms import EditChatForm

chat_routes = Blueprint("chats", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Edit chat, Delete chat
@chat_routes.route("/<int:chatId>", methods=["PUT", "DELETE"])
@login_required
def edit_delete(chatId):
    """
    Edit or Delete chat
    """
    if request.method == "PUT":
        form = EditChatForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            chat = Chat.query.get(chatId)
            chat.message = form.data["message"]
            db.session.commit()
            return {"chat": chat.to_dict()}

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    if request.method == "DELETE":
        chat = Chat.query.get(chatId)
        channel_id= chat.channel_id
        db.session.delete(chat)
        db.session.commit()

        channel = Channel.query.get(channel_id)

        return {"channel": channel.to_dict()}

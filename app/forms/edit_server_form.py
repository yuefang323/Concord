from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_login import current_user
from app.models import Server

def server_name_exists(server_id):
    # Check if server name for the user exists

    def _server_name_exists(form, field):
        name = field.data
        # and server id is different from current server id
        server = Server.query.filter(Server.user_id == current_user.id, Server.name == name, Server.id != server_id).first()
        if server:
            raise ValidationError("Server with same name already exists.")

    return _server_name_exists



class EditServerForm(FlaskForm):

    server_id = IntegerField("server_id")
    name = StringField("name", validators=[DataRequired(), server_name_exists(id), Length(min=1, max=50, message='Server name must be between 1 and 50 characters.')])
    description = StringField("description", validators=[Length( max=2000, message='Description cannot be more than 2000 characters.')])

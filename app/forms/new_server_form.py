from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from app.models import Server

def server_name_exists(form, field):
    # Check if server name for the user exists
    name = field.data
    server = Server.query.filter(Server.user_id == current_user.id, Server.name == name).first()
    if server:
        raise ValidationError("Server with same name already exists.")

class NewServerForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), server_name_exists])

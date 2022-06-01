from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_login import current_user
from app.models import Channel, Server

# def channel_name_exists(form, field):
    # Check if server name for the user exists
#     name = field.data
#     print('/////////', name)
#     print(".........", serverId)
#     channel = Channel.query.filter(Server.id == serverId, Channel.name == name).first()
#     if channel:
#         raise ValidationError("Channel with same name already exists.")

class NewChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(1, 50, message='Name must be between 1 and 50 characters.')])
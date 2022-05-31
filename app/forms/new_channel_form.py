from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from app.models import Channel, Server

def channel_name_exists(form, field):
    # Check if server name for the user exists
#     name = field.data
#     server
#     channel = Channel.query.filter(, Channel.name == name).first()
#     if channel:
#         raise ValidationError("Channel with same name already exists.")

# class NewChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), channel_name_exists])
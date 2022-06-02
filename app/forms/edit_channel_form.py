from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_login import current_user
from app.models import Channel, Server


class EditChannelForm(FlaskForm):

    name = StringField("name", validators=[DataRequired() , Length(1, 50, message='Name must be between 1 and 50 characters.')])
   

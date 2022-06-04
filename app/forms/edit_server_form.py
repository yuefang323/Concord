from flask import request, g
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

from app.models import Server

class EditServerForm(FlaskForm):

    user_id = IntegerField("user_id")
    name = StringField("name", validators=[DataRequired() , Length(min=1, max=50, message='Server name must be between 1 and 50 characters.')])
    description = StringField("description", validators=[Length( max=2000, message='Description cannot be more than 2000 characters.')])
    logo = StringField("logo")
    background = StringField("background")

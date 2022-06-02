from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User

# def email_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=5, max=40, message='Username must be between 5 and 40 characters.')])
    email = StringField('email', validators=[DataRequired(), Length(min=5, max=255, message='Email must be between 5 and 255 characters.')])
    avatar = StringField('avatar')

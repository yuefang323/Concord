from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=5, max=40, message='Username must be between 5 and 40 characters.')])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(min=5, max=255, message='Email must be between 5 and 255 characters.')])
    password = StringField('password', validators=[DataRequired(), Length(5, 255, message='Password must be between 5 and 255 characters.')])

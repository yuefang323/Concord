from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class JoinServerForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])

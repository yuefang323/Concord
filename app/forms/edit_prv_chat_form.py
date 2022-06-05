from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class EditPrvChatForm(FlaskForm):
    message = StringField("message", validators=[DataRequired(), Length(1, 2000, message="Message cannot be more than 2000 characters")])

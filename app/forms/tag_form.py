from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class TagForm(FlaskForm):
    user_id = IntegerField('User_id')
    name = StringField('Name')

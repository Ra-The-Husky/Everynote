from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class TagForm(FlaskForm):
    note_id = IntegerField('Note_id')
    name = StringField('Name')

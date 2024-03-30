from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, validators
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    notebook_id = IntegerField('Notebook_id', [validators.InputRequired()])
    name = StringField('Name', [validators.Length(min=1)])
    info = StringField('Info', [validators.Length(min=30)])

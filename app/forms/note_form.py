from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    notebook_id = SelectField('Notebook_id', coerce=int)
    name = StringField('Name', validators=[DataRequired()])
    note = StringField('Note', validators=[DataRequired()])

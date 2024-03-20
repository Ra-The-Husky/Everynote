from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    notebooks = SelectField('Notebooks', coerce=int)
    name = StringField('name')
    note = StringField('note')
    submit = SubmitField('create note')

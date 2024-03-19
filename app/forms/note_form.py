from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    notebook = SelectField('notebooks', coerce=int)
    name = StringField('name', validators=[DataRequired()])
    note = StringField('note', validators=[DataRequired()])
    submit = SubmitField('create note')

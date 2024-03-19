from app.models import User
from app.models import Note, db
from app.models import Tag
from app.models import Notebook
from app.forms.note_form import NoteForm
from flask import Blueprint, request
from flask_login import login_required, current_user
notes_route = Blueprint('notes', __name__)

@notes_route.route("")
@login_required
def get_notes():
    users = User.query.get(current_user.id)
    notes_data= [note.to_dict() for note in users.notes]
    return notes_data

@notes_route.route('/<int:noteId>')
@login_required
def get_note(noteId):
        notes = Note.query.get(noteId)
        tags = Tag.query.get(noteId)
        notebook = Notebook.query.get(noteId)
        note_data = notes.to_dict()
        tag_name = 'no tags'
        if tags:
             tag_name = tags.to_dict()
        data = {
              'note': note_data,
              'tags': tag_name,
        }
        return data

@notes_route.route('/new-note', methods=['POST'])
@login_required
def make_note():
   data = request.get_json()
   users = User.query.get(current_user.id)
   notes = Note.query.all()
#!    This prints the length of all notes in the database.
#    print(int(len(notes)), 'LENGTH OF NOTES HERE!!!!!!!!')
   add_note = NoteForm()
   add_note.notebook.choices = [nb.id for nb in users.notebooks]
   print(add_note.notebook.choices, '#$#$#$#$#$#')
   if add_note.validate_on_submit():
    new_note = {
        'id': Note(id=int(len(notes))+1),
        'user_id': current_user.id,
        'notebook_id': Note(notebook_id=add_note.notebook.data),
        'name': data.name,
        'note': data.note,
    }
    db.session.add(new_note)
    db.session.commit()
   return {
       'res': 201,
       'msg:': "Note was successfully created"
        }

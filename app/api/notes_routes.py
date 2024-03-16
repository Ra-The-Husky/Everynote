from app.models import User
from app.models import Note
from app.models import Tag
from app.models import Notebook
from flask import Blueprint
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
        tag_name = tags.to_dict()
        notebook_name = notebook.to_dict()
        data = {
              'note': note_data,
              'tags': tag_name,
        }
        return data

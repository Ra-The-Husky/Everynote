from app.models import User
from app.models import Note, db
from app.models import Tag
from app.models import Notebook
from app.forms.note_form import NoteForm
from app.forms.tag_form import TagForm
from flask import Blueprint, request, redirect
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
   users = User.query.get(current_user.id)
   notes = Note.query.all()
   add_note = NoteForm()
   add_note.notebooks.choices = [(nb.id, nb.name) for nb in users.notebooks]
   data = request.get_json()
   new_note = {
        'id': int(len(notes))+1,
        'userId': current_user.id,
        # 'notebook_id':
        'name': data['name'],
        'note': data['note'],
        }
#    db.session.add(new_note)
#    db.session.commit()
   redirect('/notes/{new_note.id}')
   return new_note

@notes_route.route('/<int:noteId>/tags', methods=['POST'])
@login_required
def add_tags(noteId):
    tags = Tag.query.all()
    data = request.get_json()
    add_tag = TagForm()
    print(data, '--------------from tags route')
    new_tag = {
         'id': int(len(tags))+1,
         'userId': current_user.id,
         'noteId': noteId,
         'name': data['name'],
    }
    print(new_tag, "$$$$$$$$$$$$$$$$ NEW TAG(S)")
    return new_tag

from flask import Blueprint, request, redirect
from app.models import Note, User, Tag, Notebook, db
from app.forms.note_form import NoteForm
from app.forms.tag_form import TagForm
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
        # notebook = Notebook.query.get(noteId)
        note_data = notes.to_dict()
        tag_name = 'no tags'
        if tags:
             tag = tags.to_dict()
        data = {
              'note': note_data,
              'tags': tag,
        }
        return data

@notes_route.route('/new-note', methods=['GET', 'POST'])
@login_required
def new_note():
   """
   Allows user to create a new note
   """
   users = User.query.get(current_user.id)
   notes = Note.query.all()
   add_note = NoteForm()
   user_notebooks = [(nb.id, nb.name) for nb in users.notebooks]
   add_note.notebook_id.choices = user_notebooks
   print(user_notebooks, '--------------choices------------')
   data = request.get_json()
   note = Note(
            id=int(len(notes))+1,
            user_id=current_user.id,
            notebook_id=add_note.notebook_id.data,
            name=data['name'],
            note=data['note'],
            )
   print(add_note.notebook_id.data, 'WHATEVER this is doing')
   print(note.to_dict(), '----!SHOULD show all the new note\'s info!----')
    #    db.session.add(note.to_dict())
    #    db.session.commit()
    #    return note
   return {'note': note.to_dict()}

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

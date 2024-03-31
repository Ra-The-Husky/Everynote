from flask import Blueprint, request, redirect, url_for
from app.models import Note, User, Tag, db
from app.forms.note_form import NoteForm
from app.forms.tag_form import TagForm
from datetime import date
from flask_login import login_required, current_user

notes_route = Blueprint('notes', __name__)

@notes_route.route("")
@login_required
def get_notes():
    users = User.query.get(current_user.id)
    notes_data= [note.to_dict() for note in users.notes]
    return notes_data

@notes_route.route('<int:noteId>/edit', methods=['PUT'])
@login_required
def edit_note(noteId):
     adjust_note = Note.query.get(noteId)
     if adjust_note.user_id == current_user.id:
        data = request.get_json()
        Tag.query.filter_by(note_id=noteId).delete()
        db.session.commit()
        tags = data.get("tags,",[])
        for tag_name in tags:
            new_tag = Tag(
                 user_id= current_user.id,
                 note_id=noteId,
                 name=tag_name,
            )
        db.session.add(new_tag)
        print(data, "is caption being passed in?")
        adjust_note.id=noteId
        adjust_note.user_id=current_user.id
        adjust_note.notebook_id=data['notebook_id']
        adjust_note.name=data['name']
        adjust_note.caption=data['caption']
        adjust_note.info=data['info']
        adjust_note.date_created=date.fromisoformat(data['date_created'])
        db.session.commit()
        return {'message': "Note Successfully Updated"}, 201
     elif adjust_note:
          return {'message': "unauthorized"}, 401
     else:
          return {'message': 'page not found'}, 404


@notes_route.route('<int:noteId>')
@login_required
def get_note(noteId):
        notes = Note.query.get(noteId)
        if notes and notes.user_id == current_user.id:
                tags = Tag.query.filter(Tag.note_id == noteId).all()
                # print(tags, 'ALL THE NOTES TAGS!!!')
                note_data = notes.to_dict()
                # print(note_data, "-----> Note Data")
                tag_data = [tag.to_dict() for tag in tags]
                # print(tag_data, '-----> Should be all the tags in a dict')
                data = {
                'note': note_data,
                'tags': tag_data,
                }
                return data
        elif notes:
          return {'message': "unauthorized"}, 401
        else:
          return {'message': 'page not found'}, 404

@notes_route.route('new-note', methods=['POST'])
@login_required
def new_note():
    add_note = NoteForm()
    data = request.get_json()
    if add_note:
         newNote = Note(
              user_id=current_user.id,
              notebook_id=data['notebook_id'],
              name=data['name'],
              caption=data['caption'],
              info=data['info'],
              date_created=date.fromisoformat(data['date_created'])
              )
         db.session.add(newNote)
         db.session.commit()
         return  { 'note': newNote.to_dict(),
                  'status': 201,
                  'message': "Note created Successfully"}

@notes_route.route('<int:noteId>', methods=['DELETE'])
@login_required
def destroy_note(noteId):
        note = Note.query.get(noteId)
        if note.user_id == current_user.id:
                db.session.delete(note)
                db.session.commit()
                return {'status': 200,
                        'message': "Note Successfully Deleted"
                        }
        elif note:
             return {'message': "unauthorized"}, 401
        else:
          return {'message': 'page not found'}, 404

@notes_route.route('<int:noteId>/tags', methods=['POST'])
@login_required
def add_tags(noteId):
    tags = request.get_json()
    for tag in tags:
         new_tag = Tag(
              user_id=current_user.id,
              note_id=noteId,
              name=tag,
              )
         db.session.add(new_tag)
         db.session.commit()
    return {'status': 201,
            'message': 'Added Tags Successfully'}

@notes_route.route('<int:noteId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def destroy_tag(noteId, tagId):
        tag=Tag.query.get(tagId)
        db.session.delete(tag)
        db.session.commit()
        return {'status': 200,
                'message': "Tag Successfully Deleted"
                }

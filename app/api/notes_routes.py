from app.models import User
from app.models import Note
from app.models import Tag
from flask import Blueprint
from flask_login import login_required, current_user
notes_route = Blueprint('notes', __name__)

@notes_route.route("")
@login_required
def get_notes():
    users = User.query.get(current_user.id)
    notes_data= [note.to_dict() for note in users.notes]
    return notes_data

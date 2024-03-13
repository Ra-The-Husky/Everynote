from app.models import User
from app.models import Note
from app.models import Notebook
from app.models import Task
from app.models import Tag
from flask import Blueprint
from flask_login import login_required, current_user
home_route = Blueprint('home', __name__)

@home_route.route("/")
@login_required
def main_page():
    print(current_user)
    users = User.query.get(current_user.id)
    notes_data= [note.to_dict() for note in users.notes]
    return notes_data

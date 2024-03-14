from app.models import User
from app.models import Note
from app.models import Notebook
from app.models import Task
from app.models import Tag
from flask import Blueprint
from flask_login import login_required, current_user
home_route = Blueprint('home', __name__)

@home_route.route("")
@login_required
def get_notes():
    users = User.query.get(current_user.id)
    notes_data= [note.to_dict() for note in users.notes]
    # users = User.query.get(current_user.id)
    def get_deadline(task):return task.deadline
    users.tasks.sort(key=get_deadline)
    noteBook_data= [notebook.to_dict() for notebook in users.notebooks]
    tasks_data= [task.to_dict() for task in users.tasks]
    data = {"notes":notes_data,"notebooks":noteBook_data,"tasks":tasks_data}

    return data

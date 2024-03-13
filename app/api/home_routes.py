
from app.models import User
from app.models import Note
from app.models import Notebook
from app.models import Task
from app.models import Tag
from flask import Blueprint,jsonify
from flask_login import login_required, current_user
home_route = Blueprint('home', __name__)

@home_route.route("/")

def main_page():
    users = User.query.get(current_user.id)
    print(users.notes.note(),"$$$$$$$$$$$$$$$$$$$$$$")
    return jsonify(*users.notes)

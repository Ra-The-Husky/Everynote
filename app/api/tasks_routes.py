from flask import Blueprint, request, redirect, url_for
from app.models import User, Task, db
from flask_login import login_required, current_user

tasks_route = Blueprint('tasks', __name__)

@tasks_route.route('/')
@login_required
def get_tasks():
  user = User.query.get(current_user.id)
  tasks_data = [task.to_dict() for task in user.tasks]
  return tasks_data

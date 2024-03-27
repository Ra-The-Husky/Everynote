from flask import Blueprint, request, redirect, url_for
from app.models import User, Task, db
from datetime import date
from flask_login import login_required, current_user

tasks_route = Blueprint('tasks', __name__)

@tasks_route.route('/', methods=['GET', 'POST'])
@login_required
def get_tasks():
  user = User.query.get(current_user.id)
  tasks_data = [task.to_dict() for task in user.tasks]
  if request.method == 'POST':
    data = request.get_json()
    print(data, 'Task DATA')
    newTask = Task(
      user_id = current_user.id,
      name = data['name'],
      deadline = date.fromisoformat(data['deadline']),
      priority = data['priority'],
      description = data['description'],
      reminder = data['reminder'],
      status = False
      )
    db.session.add(newTask)
    db.session.commit()
    task = Task.query.get(newTask.id)
    return task.to_dict()
  return tasks_data

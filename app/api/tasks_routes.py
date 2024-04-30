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

@tasks_route.route('/complete-task/<int:taskId>')
@login_required
def complete_task(taskId):
  task = Task.query.get(taskId)
  task.status = True
  db.session.commit()
  return {"message": "completed successfully"}

@tasks_route.route('/<int:taskId>/edit', methods=['PUT'])
@login_required
def edit_task(taskId):
    data = request.get_json()
    edited_task = Task.query.get(taskId)
    edited_task.name = data["name"]
    edited_task.deadline = date.fromisoformat(data['deadline'])
    edited_task.priority = data["priority"]
    edited_task.description = data["description"]
    edited_task.reminder = bool(data["reminder"] == "true")

    db.session.commit()

    return {"message": "edited successfully"}

@tasks_route.route('<int:taskId>', methods=['DELETE'])
@login_required
def destroy_task(taskId):
        task = Task.query.get(taskId)
        db.session.delete(task)
        db.session.commit()
        return {'status': 200,
                'message': "Task Successfully Deleted"
                }

from app.models import User, Notebook, db
from flask import Blueprint, request
from flask_login import login_required, current_user

notebook_route = Blueprint('notebook', __name__)

@notebook_route.route("/")
@login_required
def get_notebooks():
    users = User.query.get(current_user.id)
    notebooks = [notebook.to_dict() for notebook in users.notebooks]

    return notebooks

@notebook_route.route('/<int:notebookId>')
@login_required
def get_notebook(notebookId):
    notebook = Notebook.query.get(notebookId)
    return notebook.to_dict()

@notebook_route.route("/", methods=['POST'])
@login_required
def new_notebook():
    data = request.get_json()
    userId = User.query.get(current_user.id)
    newNotebook = Notebook(
        user_id = userId.id,
        name = data["name"],
        description = data["description"]
    )

    db.session.add(newNotebook)
    db.session.commit()

    return {"message": "created successfully"}

@notebook_route.route('/<int:notebookId>/edit', methods=['PUT'])
@login_required
def edit_notebook(notebookId):
    data = request.get_json()
    userId = User.query.get(current_user.id)
    editebook = Notebook.query.get(notebookId)
    editebook.id = editebook.id
    editebook.user_id = editebook.user_id
    editebook.name = data["name"]
    editebook.description = data["description"]

    db.session.commit()

    return {"message": "created successfully"}

@notebook_route.route('<int:notebookId>', methods=['DELETE'])
@login_required
def destroy_notebook(notebookId):
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        return {'status': 200,
                'message': "Note Successfully Deleted"
                }

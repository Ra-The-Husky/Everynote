from app.models import User, Notebook
from flask import Blueprint
from flask_login import login_required, current_user

notebook_route = Blueprint('notebook', __name__)

@notebook_route.route("/")
@login_required
def get_notebooks():
    users = User.query.get(current_user.id)
    notebooks = [notebook.to_dict() for notebook in users.notebooks]

    return notebooks

from .db import db, environment, SCHEMA

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
          __table_args__= {'schema':SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable = False)
    name = db.Column(db.String(50), nullable=False)
    deadline= db.Column(db.Date,nullable = False)
    priority = db.Column(db.String(50),nullable = False)
    description = db.Column(db.String(255),nullable = False)
    reminder = db.Column(db.Boolean)
    status = db.Column(db.Boolean)
    users = db.relationship("User",back_populates="tasks")

    def to_dict(self):
        return{
            "id" : self.id,
            "name":self.name,
            "deadline":self.deadline,
            "priority":self.priority,
            "description":self.description,
            "reminder":self.reminder,
            "status":self.status,
        }

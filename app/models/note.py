from .db import db, environment, SCHEMA

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(255))
    notebooks = db.relationship('Notebook', back_populates="notes")

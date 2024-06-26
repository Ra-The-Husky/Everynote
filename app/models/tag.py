from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='tags')
    notes = db.relationship('Note', back_populates='tags')

    def to_dict(self):
        return{
            "id" : self.id,
            "name":self.name,
        }

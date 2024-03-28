from .db import db, environment, SCHEMA

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    info = db.Column(db.String(255))
    # caption = db.Column(db.String(50))
    # date_created = db.Column(db.Date)
    notebooks = db.relationship('Notebook', back_populates="notes")
    users = db.relationship("User", back_populates="notes")
    tags = db.relationship("Tag",
                           back_populates="notes",
                           cascade="all, delete-orphan")


    def to_dict(self):
        return{
            "id" : self.id,
            'user_id':self.user_id,
            'notebook_id':self.notebook_id,
            "name":self.name,
            # "caption": self.caption,
            "info":self.info,
            # "date_created":self.date_created,
            "tags": [tag.to_dict() for tag in self.tags]
        }

from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_notes():
    note1 = Note(
        user_id=1, notebook_id=1, name='note1', info='test note')
    note2 = Note(
        user_id=1, notebook_id=1, name='note2', info='2nd test note')
    note3 = Note(
        user_id=1, notebook_id=4, name='note3', info='3rd test note')
    note4 = Note(
        user_id=2, notebook_id=2, name='note1', info='test note')
    note5 = Note(
        user_id=2, notebook_id=2, name='note2', info='test note')
    note6 = Note(
        user_id=2, notebook_id=2, name='note3', info='test note')
    note7 = Note(
        user_id=3, notebook_id=3, name='note1', info='test note')
    note8 = Note(
        user_id=3, notebook_id=3, name='note2', info='test note')
    note9 = Note(
        user_id=3, notebook_id=3, name='note3', info='test note')

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()

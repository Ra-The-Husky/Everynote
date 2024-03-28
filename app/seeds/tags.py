from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags():
    tag1 = Tag(
        user_id=1, note_id=1 , name='Brands')
    tag2 = Tag(
        user_id=1, note_id=1 , name='FAV')
    tag3 = Tag(
        user_id=1, note_id=1 , name='Skin-Care')
    tag4 = Tag(
        user_id=1, note_id=1 , name='Daily')
    tag5 = Tag(
        user_id=1, note_id=2 , name='Routine')
    tag6 = Tag(
        user_id=1, note_id=2 , name='LoveTheProcess')
    tag7 = Tag(
        user_id=1, note_id=3 , name='Rivals')
    tag8 = Tag(
        user_id=2, note_id=4 , name='weirdAF')
    tag9 = Tag(
        user_id=2, note_id=4 , name='ExistentialCrisis')
    tag10 = Tag(
        user_id=2, note_id=4 , name='Dreams')
    tag11 = Tag(
        user_id=2, note_id=4 , name='Nightmare')
    tag12 = Tag(
        user_id=2, note_id=4 , name='Sleep')

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)
    db.session.add(tag11)
    db.session.add(tag12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()

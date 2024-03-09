from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_notes():
    task1 = Task(
        user_id=1, name='task1', deadline=date.today(),priority="High",description="take out the trash",reminder=False
        ,status=False)
    task2 = Task(
        user_id=2, name='task2', deadline=date.today(),priority="High",description="make pizza",reminder=False
        ,status=False)
    task3 = Task(
        user_id=3, name='task3', deadline=date.today(),priority="High",description="eat pizza",reminder=False
        ,status=False)



    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
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

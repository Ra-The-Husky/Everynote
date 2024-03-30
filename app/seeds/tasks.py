
from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date,timedelta

# Adds tasks to a demo user, you can add more tasks. Keep in mind the date format for python.
def seed_tasks():
    task1 = Task(
        user_id=1, name='Organize files in cabinet', deadline=date.today()+timedelta(weeks=10),priority="Low",description="need to reorganize all the files in my work cabinet at some point. Also need to clean desk space",reminder=True
        ,status=False)
    task2 = Task(
        user_id=1, name='Change oil', deadline=date.today()+timedelta(weeks=5),priority="Medium",description="i have to change the oil in the car soon. Cant keep forgetting this because it will bite me in the ass later!",reminder=False
        ,status=False)
    task3 = Task(
        user_id=1, name='Go to court', deadline= date.today()+timedelta(days=6),priority="High",description="Got caught speeding again have to go to court so i dont loose my license",reminder=True
        ,status=False)

    task4 = Task(
        user_id=2, name='Send birthday e-vites', deadline=date.today()+timedelta(days=3),priority="Medium",description="need to make birthday e-vites on canva for daughter's 5th birthday and send them to all of her friends parents!",reminder=False
        ,status=False)




    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()

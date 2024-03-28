from app.models import db, Note, environment, SCHEMA
from datetime import date,timedelta
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_notes():
    note1 = Note(
        user_id=1, notebook_id=1, name='fav-Brands',caption="these are my fav brands", info='Ceravee-Cheap, Olay-Good but expensive,La Mer-very unique,Neutrogena-its ok nothing too great',date_created=date.today()-timedelta(days=22))
    note2 = Note(
        user_id=1, notebook_id=1, name='Process',caption="skin care steps", info='step1:Wash face,step2:dry towel,step3:apply products,step4:be fly!',date_created=date.today()-timedelta(days=180))
    note3 = Note(
        user_id=1, notebook_id=2, name='Rival-Teams',caption="Notes on rival teams", info='the quarter back on west shore highwayman team cant handle a blitz. The north field aurochs\' running back has an achilles heel',date_created=date.today()-timedelta(days=118))
    note4 = Note(
        user_id=2, notebook_id=3, name='Weird-Dreams',caption="dreams that have me question reality", info='I  had a dream where i was running from an inexplicable entity and when it caught me it vommited hot coffe into my mouth.Still to this day im trying to figure out because i hate coffee!',date_created=date.today()-timedelta(days=202))


    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With``
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()

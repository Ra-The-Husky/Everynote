import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { homeThunk } from "../../redux/home";
import moment from "moment";

import "./Homepage.css";

function Homepage() {
  const userNotes = useSelector((state) => state.home?.notes);
  const userNotebooks = useSelector((state) => state.home?.notebook);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeThunk()).then((data) => {
      if (data && data.tasks.length > 0) {
        const recentTasks = []

        data.tasks.map(task => {
          if (!task.status && recentTasks.length < 3) {
            recentTasks.push(task);
          }
        })

        setTasks(recentTasks)
      }

      if (data && data.notes) {
        setNotes([data.notes[0], data.notes[1], data.notes[2]]);
      }
    });
  }, [dispatch]);

  return (
    <div className="Homepage">
      <span className="banner-cont">
      <img className="homepage-banner" src="https://res.cloudinary.com/dfxxgifho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1710376011/istockphoto-1303583671-612x612_f5tvml.jpg?_s=public-apps" />
      </span>
      <h2>Home</h2>
      <div className="homeContent">
        <div className="homeLeftPanel">
          <div className="homeNotebooks">
            <h4>{userNotebooks && userNotebooks[0]?.name}</h4>
            <p>{userNotebooks && userNotebooks[0]?.description}</p>
          </div>
          <div className="homeTasks">
            <h3>Your Tasks</h3>
            {!tasks?.length ? (
              <div className="taskMsg" >Add some tasks!</div>
            ) : (
              <div>
                {tasks &&
                  tasks.map((task) => (
                    <div className="homeTask" key={task && task?.id}>
                      {!Boolean(task.status) &&
                      <div className="taskInfo">
                        <p>{task && task?.name}</p>
                        <p>{task && moment(task && task?.deadline).format("MM-DD-YYYY")}</p>
                        <p>{task && task?.priority}</p>
                      </div>}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="homeNotesContainer">
          <h3>Your Recent Notes</h3>
          <div className="homeNotes">
            {!userNotes?.length ? (
              <div className="noteInfo">
                <p>Start writing notes!</p>
              </div>
            ) : (
              <div className="homeNotes">
                {userNotes &&
                  notes.map((note) => (
                    <div className="homeNote" key={note && note.id}>
                      <div className="">
                        <h4>{note && note.name}</h4>
                        <p>{note && note.info}</p>
                      </div>
                      <div className="homeTags">
                        {note && note.tags &&
                          note.tags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

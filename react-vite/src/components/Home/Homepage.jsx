import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { homeThunk } from "../../redux/home";
import moment from "moment";

import "./Homepage.css";

function Homepage() {
  const userNotes = useSelector((state) => state.home?.notes);
  const userNotebooks = useSelector((state) => state.home?.notebook);
  const userTasks = useSelector((state) => state.home?.tasks);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  const dispatch = useDispatch();

  if (userTasks && userTasks.length > 0 && tasks.length === 0) {
    setTasks([userTasks[0], userTasks[1], userTasks[2]]);
  }

  if (userNotes && userNotes.length > 0 && notes.length === 0) {
    setNotes([userNotes[0], userNotes[1], userNotes[2]]);
  }

  useEffect(() => {
    dispatch(homeThunk());
  }, [dispatch]);
  
  return (
    <div className="Homepage">
      <img src="https://res.cloudinary.com/dfxxgifho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1710376011/istockphoto-1303583671-612x612_f5tvml.jpg?_s=public-apps" />
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
            <p>Add some tasks!</p>
          ) : (
          <div>
              {tasks &&
                tasks.map((task) => (
                  <div className="homeTask" key={task.id}>
                    <div className="taskInfo">
                      <p>{task.name}</p>
                      <p>{moment(task.deadline).format("MM-DD-YYYY")}</p>
                      <p>{task.priority}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          </div>
        </div>
        <h3 className="homeNotes">Your Recent Notes</h3>
        <div>
          {!userNotes?.length ? (
            <div>
              <p className="noteInfo">Start writing notes!</p>
            </div>
          ) : (
            <div>
              {userNotes &&
                userNotes.map((note) => (
                  <div className="homeNote" key={note.id}>
                    <div className="noteInfo">
                      <h4>{note.name}</h4>
                      <p>{note.info}</p>
                    </div>
                    <div className="homeTags">
                      {note.tags &&
                        note.tags.map((tag) => <div>{tag.name}</div>)}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

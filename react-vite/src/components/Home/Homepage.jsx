import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { noteThunk } from "../../redux/home";
import moment from "moment"
function Homepage() {
  const userNotes = useSelector((state) => state.home.notes);
  const userNotebooks = useSelector((state) => state.home.notebook);
  const userTasks = useSelector((state) => state.home.tasks);
  const [tasks,setTasks] = useState([])

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(noteThunk());
    // if(userTasks && userTasks.length){
    //   setTasks([userTasks[0],userTasks[1],userTasks[2]])
    // }
    console.log(userTasks,"!@!@!@!@!@!@!")
  }, [dispatch]);
  return (
    <div className="HomePage">
      <p>Image will go here</p>
      <h2>Users Home</h2>
      <div>
        <div>{userNotebooks && userNotebooks[0].name}</div>
        <p>{userNotebooks && userNotebooks[0].description}</p>
        <div>
          <div>
            {userNotes &&
              userNotes.map((notes) => (
                <div key={notes.id}>
                  <h4>{notes.name}</h4>
                  <p>{notes.note}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h3>Your Tasks</h3>
          <ol>
            {tasks &&
              tasks.map((task) => (
                <div key={task.id}>
                  <div>
                    {task.name}
                    <br/>
                    {moment(task.deadline).format("MM-DD-YYYY")}
                    <br/>
                    {task.priority}
                    <br/>
                  </div>
                </div>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

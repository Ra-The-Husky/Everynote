import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createTask } from "../../redux/tasks";

function CreateTaskModal() {
  const { closeModal } = useModal();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState();
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("false");
  const [errors, setErrors] = useState({});
  const tasks = useSelector((state) => state.tasks?.tasks);

  const testTask = () => {
    setName("Test Task");
    setDescription("Setting a test description for the test task");
  };

  useEffect(() => {
    const errs = {};
    if (!name) {
      errs.name = "Task name required";
    }
    if (tasks) {
      tasks.forEach((task) => {
        if (name === task.name) {
          errs.name = "Task already exists";
        }
      });
    }
    if (name.length > 30) {
      errs.name = "Cannot exceed 30 characters";
    }
    if (!description) {
      errs.description = "Task description required";
    }
    if (description.length < 20) {
      errs.description = "Description should be a minimum of 20 characters";
    }
    setErrors(errs);
  }, [name, description, tasks]);

  const submitTask = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      deadline: new Date(deadline)
        .toISOString()
        .split("T")
        .splice(0, 1)
        .join(""),
      priority,
      description,
      reminder,
    };

    if (Object.values(errors).length) {
      return errors
    } else {
      dispatch(createTask(newTask)).then(() => {
        closeModal();

        navigate(`/tasks`);
      });
    }
  };

  return (
    <div className="createTaskModal">
      <div className="inner-task">
        <h1>Create A New Task</h1>
        <form className="createTaskForm" onSubmit={submitTask}>
          <input
            className="input-name-task"
            type="text"
            placeholder="Name required"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/ +(?= )/g, ""))}
          ></input>

          <input
            className="input-date-task"
            selected={deadline}
            type="date"
            min={new Date().toISOString().split("T").splice(0, 1).join("")}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></input>
          <div id="required" hidden={deadline} style={{ color: 'red' }}>Required</div>

          <select
            className="input-selector"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={""} disabled>
              Please Select Priority
            </option>
            <option value={"Low"}>Low</option>
            <option value={"Medium"}>Medium</option>
            <option value={"High"}>High</option>
          </select>

          <textarea
            className="input-desc-task"
            type="text"
            placeholder="Description required"
            value={description}
            onChange={(e) => setDescription(e.target.value.replace(/ +(?= )/g, ""))}
          ></textarea>

          <label htmlFor="reminder">Reminder</label>
          <input
            name="reminder"
            type="checkbox"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          ></input>

          <div className="note-button">
            <button
              className="new-note-submit save-disable"
              type="submit"
              disabled={Object.values(errors).length}
            >
              Save
            </button>
            <button className="new-note-submit" onClick={testTask}>
              Test Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;

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
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(false);
  const [errors, setErrors] = useState({});
  const tasks = useSelector((state) => state.tasks.tasks);

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
  }, [name, description]);

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
      return console.log(errors);
    } else {
      dispatch(createTask(newTask)).then(() => {
        closeModal();

        navigate(`/tasks`);
      });
    }
  };

  const handleChange = (date) => {
    setDeadline(date);
  };

  return (
    <div className="createTaskModal">
      <h1>Create A New Task</h1>
      <form className="createTaskForm" onSubmit={submitTask}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        {errors.name && <p>{errors.name}</p>}

        <div className="deadline">
          <input
            type="date"
            min={new Date().toISOString().split('T').splice(0, 1).join('')}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></input>
        </div>
        <div className="priority">
          <select
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
        </div>
        <div className="description">
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div className="reminder">
          <label htmlFor="reminder">Reminder</label>
          <input
            name="reminder"
            type="checkbox"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          ></input>
        </div>
        <div className="buttons">
          <button
            className="button"
            type="submit"
            disabled={Object.values(errors).length}
          >
            Save
          </button>
          <button onClick={testTask}>Test Task</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskModal;

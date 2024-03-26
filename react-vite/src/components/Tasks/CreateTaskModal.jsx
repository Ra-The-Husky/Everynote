import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function CreateTaskModal() {
  const { closeModal } = useModal();

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState();
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(false);
  const [done, setDone] = useState(false);

  const submitTask = async (e) => {
    e.preventDefault();
    const newTask = {
      name,
      deadline,
      priority,
      description,
      reminder,
      'status': done
    };

    dispatch().then(() => {
      closeModal()
      navigate(`/tasks`)
    })
  };

  const handleChange = date => {
    setDeadline(date)
  };

  return (
    <>
      <h1>Create A New Task</h1>
      <form onSubmit={submitTask}>
        <div className="name">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="deadline">
          <DatePicker
            selected={deadline}
            minDate={new Date()}
            onChange={handleChange}
          />
        </div>
        <div className="deadline">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option
              value={""}
              disabled
            >Please Select Priority</option>
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
        <div className="status">
          <label htmlFor="status">Done</label>
          <input
            name="status"
            type="checkbox"
            value={done}
            onChange={(e) => setDone(e.target.value)}
          ></input>
        </div>
        <div className="buttons">
          <button
            className="button"
            type="submit"
            disabled={!name || !deadline || !priority || !description}
          >Save</button>
        </div>
      </form>
    </>
  )
}

export default CreateTaskModal

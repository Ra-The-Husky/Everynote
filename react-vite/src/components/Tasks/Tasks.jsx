import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksThunk } from "../../redux/tasks";
import { useModal } from '../../context/Modal';
import './Tasks.css'

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks)

  useEffect(() => {
    dispatch(tasksThunk())
  }, [dispatch])

  return (
    <>
      <h1>Tasks</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" >Task Name</th>
            <th scope="col" >Due Date</th>
            <th scope="col" >Description</th>
            <th scope="col" >Done</th>
            <th scope="col" ></th>
          </tr>
        </thead>
        {tasks && tasks.map((task) => (
          <tbody key={task.id}>
            <tr className="row">
              <td scope="row" className="col2"><span className="notebookName" >{task.name}</span></td>
              <td className="col">{task.deadline}</td>
              <td className="col">{task.description}</td>
              <td className="col"><input type="checkbox" /></td>
              <td className="col"><button>Delete</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Tasks

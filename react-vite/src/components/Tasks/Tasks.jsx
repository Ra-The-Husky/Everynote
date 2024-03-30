import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksThunk, finishedTaskThunk } from "../../redux/tasks";

import './Tasks.css'

function Tasks() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks?.tasks)

    useEffect(() => {
        dispatch(tasksThunk())
    }, [dispatch])

    const handleChange = (e, taskId) => {
        if (e.target.checked) {
            document.getElementById(taskId).className = e.target.checked
            e.target.disabled = true
            dispatch(finishedTaskThunk(taskId))
        } else {
            document.getElementById(taskId).className = e.target.checked
        }
    }

    return (
        <>
            <h1>Tasks</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Task Name</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Done</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {tasks && tasks.map((task) => (
                    <tbody key={task.id} id={task.id} className={`${task.status}`}>
                        <tr className="row">
                            <td scope="row" className={`col2`}><span className="notebookName" >{task.name}</span></td>
                            <td className={`col`}>{task.deadline.split(" ").splice(1,3).join(' ')}</td>
                            <td className={`col`}>{task.description}</td>
                            <td className={`col`}><input type="checkbox" checked={task.status} disabled={task.status} onChange={(e) => handleChange(e, task.id)} /></td>
                            <td className={`col`}><button onClick={() => {alert("Feature coming soon")}}>Delete</button></td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </>
    );
}

export default Tasks

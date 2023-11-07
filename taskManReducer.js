// Given the completed TaskManager component, your challenge is to finish implementing the reducer function so that the user can add, update, and delete tasks.

// TASKS
// The user should be able to add a new task
// The user should be able to update the status of a task
// The user should be able to delete a task

import * as React from "react";
import { createTask } from "./utils";

// The reducer needs to have statements for each type made in the components and preferably an error catch.
function reducer(tasks, action) {
// each return statement will replace the current state value from the useReducer(in this case "tasks")
    if(action.type === "add") {
        return [...tasks, action.task]
    }
// Since reducer is mainly used for multiple state based effects, this will probably be an array or object
    if(action.type === "updated") {
        return tasks.map((task)=>
            task.id===action.id ? 
            {
                ...task,
                status: task.status === "pending" ? "completed":"pending"
            }
            : task
        )
    }
// Therefore using .map, .filter, and spread operator are imperative
// using task.id to relate to the current value and action.id for the new action 
    if(action.type === "delete") {
        return tasks.filter((task)=> task.id != action.id)
    }
    throw new Error("This action type isn't supported")
}

export default function TaskManager() {
// [] is a blank array for the inital state.
    const [tasks, dispatch] = React.useReducer(reducer, []);

    const handleUpdateTaskStatus = (id) => {
        dispatch({ type: "update", id });
    };

    const handleDeleteTask = (id) => {
        dispatch({ type: "delete", id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        dispatch({ type: "add", task: createTask(formData.get("task")) });

        e.target.reset();
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <form onSubmit={handleSubmit}>
                <input name="task" placeholder="Task title" />
                <button className="primary" type="submit">
                    Add Task
                </button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div>
                            <button
                                className={`status ${task.status}`}
                                onClick={() => handleUpdateTaskStatus(task.id)}
                            />
                            {task.title}
                        </div>
                        <button className="link" onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


//Github is screwy, lets see if this fixes it.
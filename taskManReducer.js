// Given the completed TaskManager component, your challenge is to finish implementing the reducer function so that the user can add, update, and delete tasks.

// TASKS
// The user should be able to add a new task
// The user should be able to update the status of a task
// The user should be able to delete a task

import * as React from "react";
import { createTask } from "./utils";

function reducer(tasks, action) {
    return tasks;
}

export default function TaskManager() {
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

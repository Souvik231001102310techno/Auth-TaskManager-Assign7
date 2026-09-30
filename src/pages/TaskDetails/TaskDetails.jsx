import { useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useTasks } from "../../context/TaskContext";

import "./TaskDetails.css";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    tasks,
    updateTask,
    deleteTask
  } = useTasks();

  const task = tasks.find(
    item => item.id === Number(taskId)
  );

  const [description, setDescription] =
    useState(
      task?.description || ""
    );

  const [priority, setPriority] =
    useState(
      task?.priority || "Medium"
    );

  const [category, setCategory] =
    useState(
      task?.category || "College"
    );

  const [dueDate, setDueDate] =
    useState(
      task?.dueDate || ""
    );

  const [status, setStatus] =
    useState(
      task?.status || "Pending"
    );

  if (!task) {
    return (
      <div className="task-not-found">
        <h2>
          Task Not Found
        </h2>

        <button
          onClick={() =>
            navigate("/tasks")
          }
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleUpdate = event => {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    updateTask({
      ...task,
      description:
        description.trim(),
      priority,
      category,
      dueDate,
      status
    });

    navigate("/tasks");
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/tasks");
  };

  return (
    <div className="task-details-page">
      <div className="task-details-header">
        <div>
          <span>
            TASK DETAILS
          </span>

          <h1>
            Update Task
          </h1>

          <p>
            Edit your task information.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/tasks")
          }
        >
          ← Back
        </button>
      </div>

      <form
        className="task-details-form"
        onSubmit={handleUpdate}
      >
        <div className="details-group full">
          <label>
            Task Description
          </label>

          <textarea
            value={description}
            onChange={event =>
              setDescription(
                event.target.value
              )
            }
            rows="5"
          />
        </div>

        <div className="details-group">
          <label>
            Priority
          </label>

          <select
            value={priority}
            onChange={event =>
              setPriority(
                event.target.value
              )
            }
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>
        </div>

        <div className="details-group">
          <label>
            Category
          </label>

          <select
            value={category}
            onChange={event =>
              setCategory(
                event.target.value
              )
            }
          >
            <option value="College">
              College
            </option>

            <option value="Study">
              Study
            </option>

            <option value="Project">
              Project
            </option>

            <option value="Practice">
              Practice
            </option>

            <option value="Personal">
              Personal
            </option>
          </select>
        </div>

        <div className="details-group">
          <label>
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={event =>
              setDueDate(
                event.target.value
              )
            }
          />
        </div>

        <div className="details-group">
          <label>
            Status
          </label>

          <select
            value={status}
            onChange={event =>
              setStatus(
                event.target.value
              )
            }
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        <div className="details-actions">
          <button
            type="button"
            className="details-delete"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            type="button"
            className="details-cancel"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="details-update"
          >
            Update Task →
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
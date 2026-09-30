import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({
  initialData,
  onSubmit,
  submitText = "Add Task →"
}) => {
  const [description, setDescription] =
    useState(
      initialData?.description || ""
    );

  const [priority, setPriority] =
    useState(
      initialData?.priority || "Medium"
    );

  const [category, setCategory] =
    useState(
      initialData?.category || "College"
    );

  const [dueDate, setDueDate] =
    useState(
      initialData?.dueDate || ""
    );

  const [status, setStatus] =
    useState(
      initialData?.status || "Pending"
    );

  const [error, setError] =
    useState("");

  const handleSubmit = event => {
    event.preventDefault();

    if (!description.trim()) {
      setError(
        "Task description is required."
      );
      return;
    }

    if (!dueDate) {
      setError(
        "Due date is required."
      );
      return;
    }

    setError("");

    onSubmit({
      ...(initialData || {}),
      description: description.trim(),
      priority,
      category,
      dueDate,
      status
    });
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="task-form-error">
          {error}
        </div>
      )}

      <div className="task-form-group full">
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
          placeholder="Enter task description"
          rows="5"
        />
      </div>

      <div className="task-form-group">
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

      <div className="task-form-group">
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

      <div className="task-form-group">
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

      <div className="task-form-group">
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

      <button
        className="task-form-submit"
        type="submit"
      >
        {submitText}
      </button>
    </form>
  );
};

export default TaskForm;
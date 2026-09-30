import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const {
    toggleTask,
    deleteTask
  } = useTasks();

  const handleComplete = () => {
    toggleTask(task.id);
  };

  const handleUpdate = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="task-card">
      <div className="task-card-top">
        <span
          className={`priority ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

        <span
          className={`task-status ${
            task.status === "Completed"
              ? "completed"
              : "pending"
          }`}
        >
          {task.status}
        </span>
      </div>

      <h3>
        {task.description}
      </h3>

      <div className="task-info">
        <span>
          Category: {task.category}
        </span>

        <span>
          Due: {task.dueDate}
        </span>
      </div>

      <div className="task-card-actions">
        <button
          type="button"
          className="complete-button"
          onClick={handleComplete}
        >
          {task.status === "Completed"
            ? "Mark Pending"
            : "Complete"}
        </button>

        <button
          type="button"
          className="update-button"
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
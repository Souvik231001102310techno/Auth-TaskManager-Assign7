import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./Completed.css";

const Completed = () => {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const completedTasks =
    tasks.filter(
      task => task.status === "Completed"
    );

  return (
    <div className="completed-page">
      <div className="completed-header">
        <div>
          <span>
            TASK MANAGEMENT
          </span>

          <h1>
            Completed Tasks
          </h1>

          <p>
            View all tasks that have been
            completed.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/tasks")
          }
        >
          ← All Tasks
        </button>
      </div>

      {completedTasks.length > 0 ? (
        <div className="completed-grid">
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      ) : (
        <div className="completed-empty">
          <h2>
            No Completed Tasks
          </h2>

          <p>
            Complete a task to see it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Completed;
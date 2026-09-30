import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      task => task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      task => task.status !== "Completed"
    ).length;

  const highPriority =
    tasks.filter(
      task => task.priority === "High"
    ).length;

  const currentUser =
    localStorage.getItem(
      "taskflow-current-user"
    ) || "User";

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <span className="dashboard-label">
            TASKFLOW DASHBOARD
          </span>

          <h1>
            Welcome,{" "}
            <span>{currentUser}</span>
          </h1>

          <p>
            Manage your tasks and keep your
            productivity moving forward.
          </p>
        </div>

        <button
          className="dashboard-add-button"
          onClick={() =>
            navigate("/tasks/add")
          }
        >
          + Add New Task
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="stat-card">
          <span>High Priority</span>
          <strong>{highPriority}</strong>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-heading">
          <div>
            <span>
              QUICK ACCESS
            </span>

            <h2>
              Manage Your Tasks
            </h2>
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            onClick={() =>
              navigate("/tasks")
            }
          >
            <strong>
              View All Tasks
            </strong>

            <span>
              Manage your complete task list
            </span>
          </button>

          <button
            onClick={() =>
              navigate("/tasks/add")
            }
          >
            <strong>
              Add Task
            </strong>

            <span>
              Create a new task
            </span>
          </button>

          <button
            onClick={() =>
              navigate("/completed")
            }
          >
            <strong>
              Completed Tasks
            </strong>

            <span>
              View finished tasks
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
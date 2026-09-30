import {
  NavLink,
  useNavigate
} from "react-router-dom";

import { useTasks } from "../../context/TaskContext";

import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const pendingCount =
    tasks.filter(
      task => task.status !== "Completed"
    ).length;

  const currentUser =
    localStorage.getItem(
      "taskflow-current-user"
    );

  const handleLogout = () => {
    localStorage.removeItem(
      "taskflow-token"
    );

    sessionStorage.removeItem(
      "taskflow-token"
    );

    localStorage.removeItem(
      "taskflow-current-user"
    );

    navigate("/login", {
      replace: true
    });
  };

  return (
    <nav className="topbar">
      <div
        className="task-brand"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        <div className="task-logo">
          T
        </div>

        <div>
          <h2>
            TaskFlow
          </h2>

          <span>
            Smart Task Manager
          </span>
        </div>
      </div>

      <div className="navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/tasks/add"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Add Task
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Completed
        </NavLink>
      </div>

      <div className="topbar-right">
        <div className="topbar-status">
          <span className="pending-dot"></span>

          <span>
            {pendingCount} Pending
          </span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
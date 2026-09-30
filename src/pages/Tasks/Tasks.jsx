import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./Tasks.css";

const Tasks = () => {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "All" ||
        task.status === filter ||
        task.priority === filter ||
        task.category === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [tasks, search, filter]);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <span className="tasks-label">
            TASK MANAGEMENT
          </span>

          <h1>
            All Tasks
          </h1>

          <p>
            Search, filter and manage your
            tasks.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/tasks/add")
          }
        >
          + Add Task
        </button>
      </div>

      <div className="tasks-toolbar">
        <input
          type="text"
          value={search}
          onChange={event =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search tasks..."
        />

        <select
          value={filter}
          onChange={event =>
            setFilter(
              event.target.value
            )
          }
        >
          <option value="All">
            All Tasks
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="High">
            High Priority
          </option>

          <option value="Medium">
            Medium Priority
          </option>

          <option value="Low">
            Low Priority
          </option>

          <option value="College">
            College
          </option>

          <option value="Study">
            Study
          </option>

          <option value="Project">
            Project
          </option>
        </select>
      </div>

      <div className="tasks-count">
        Showing{" "}
        <strong>
          {filteredTasks.length}
        </strong>{" "}
        of{" "}
        <strong>
          {tasks.length}
        </strong>{" "}
        tasks
      </div>

      {filteredTasks.length > 0 ? (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      ) : (
        <div className="empty-tasks">
          <h2>
            No Tasks Found
          </h2>

          <p>
            Try changing your search or
            filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
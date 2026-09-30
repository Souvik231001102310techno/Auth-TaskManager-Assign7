import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import TaskForm from "../../components/TaskForm/TaskForm";
import "./AddTask.css";

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleAddTask = task => {
    addTask(task);
    navigate("/tasks");
  };

  return (
    <div className="add-task-page">
      <div className="add-task-header">
        <div>
          <span>
            TASK MANAGEMENT
          </span>

          <h1>
            Add New Task
          </h1>

          <p>
            Create a new task and keep track
            of your work.
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

      <TaskForm
        onSubmit={handleAddTask}
        submitText="Add Task →"
      />
    </div>
  );
};

export default AddTask;
import {
  createContext,
  useContext,
  useState
} from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    description: "Complete React Router assignment",
    priority: "High",
    category: "College",
    dueDate: "2026-10-02",
    status: "Pending"
  },
  {
    id: 2,
    description: "Prepare Java interview questions",
    priority: "Medium",
    category: "Study",
    dueDate: "2026-10-05",
    status: "Pending"
  },
  {
    id: 3,
    description: "Complete portfolio project",
    priority: "High",
    category: "Project",
    dueDate: "2026-10-08",
    status: "Completed"
  },
  {
    id: 4,
    description: "Practice binary search problems",
    priority: "Low",
    category: "Practice",
    dueDate: "2026-10-10",
    status: "Pending"
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] =
    useState(initialTasks);

  const addTask = task => {
    setTasks(previous => [
      ...previous,
      {
        ...task,
        id: Date.now()
      }
    ]);
  };

  const updateTask = updatedTask => {
    setTasks(previous =>
      previous.map(task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  const deleteTask = id => {
    setTasks(previous =>
      previous.filter(
        task => task.id !== id
      )
    );
  };

  const toggleTask = id => {
    setTasks(previous =>
      previous.map(task =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "Pending"
                  : "Completed"
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () =>
  useContext(TaskContext);
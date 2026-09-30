import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import TaskLayout from "./layouts/TaskLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import AddTask from "./pages/AddTask/AddTask";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import Completed from "./pages/Completed/Completed";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TaskLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="tasks"
          element={<Tasks />}
        />

        <Route
          path="tasks/add"
          element={<AddTask />}
        />

        <Route
          path="tasks/:taskId"
          element={<TaskDetails />}
        />

        <Route
          path="completed"
          element={<Completed />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
};

export default App;
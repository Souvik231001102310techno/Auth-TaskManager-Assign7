import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";

const TaskLayout = () => {
  return (
    <div className="task-layout">
      <TopBar />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TaskLayout;
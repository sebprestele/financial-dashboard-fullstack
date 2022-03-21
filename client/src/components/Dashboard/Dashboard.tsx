import Sidebar from "../Sidebar/Sidebar";
import Main from "./Main";

const Dashboard = () => {
  return (
    <>
      <div className="general-layout">
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default Dashboard;

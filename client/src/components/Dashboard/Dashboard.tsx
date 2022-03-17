import Sidebar from "../Sidebar/Sidebar";
import Main from "./Main";
import useCheckAuthentication from "../../Hooks/useCheckAuthentication";

const Dashboard = () => {
  useCheckAuthentication();
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

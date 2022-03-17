import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

const Transactions = () => {
  return (
    <div className="general-layout">
      <Navigation />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default Transactions;

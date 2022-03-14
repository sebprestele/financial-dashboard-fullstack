import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log("protectroute", isLoggedIn);

  return <>{!isLoggedIn ? navigate("/login") : children}</>;
};

export default ProtectedRoute;

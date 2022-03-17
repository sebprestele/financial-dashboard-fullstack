import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../Redux/store";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn, navigate]);

  return children;
};

export default ProtectedRoute;

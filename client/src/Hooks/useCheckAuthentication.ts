import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../Redux/userSlice";
import { useEffect } from "react";

function useCheckAuthentication() {
  const dispatch = useDispatch();
  const timestamp = Math.floor(Date.now() / 1000);
  console.log(timestamp);

  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000);
    let storedToken = localStorage.getItem("currentToken");

    if (!storedToken) {
      dispatch(setIsLoggedIn());
    } else if (storedToken) {
      const decodedToken = jwt_decode(storedToken);

      // @ts-ignore
      console.log(decodedToken.exp);
      // @ts-ignore
      if (decodedToken.exp * 1000 < timestamp) {
        dispatch(setIsLoggedIn());
        localStorage.removeItem("currentToken");
        console.log("removedToken");
      }
    } else return;
  }, [dispatch]);
}

export default useCheckAuthentication;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { RootState } from "../../Redux/store";
import useCheckAuthentication from "../../Hooks/useCheckAuthentication";

function User() {
  const location = useLocation();
  const navigate = useNavigate();

  //const allUserData = useSelector((state): RootState => state.user.allUser);
  //const filteredUser = allUserData.filter((user) => user.username === username);
  const currentUserData = useSelector((state: RootState) => state.user.user);
  const currentUserName = useSelector(
    (state: RootState) => state.user.username
  );
  //Check if user is on it's personal user page, if not than redirect to login
  const allowedPath = `/user/${currentUserName}`;
  useEffect(() => {
    allowedPath !== location.pathname && navigate("/login");
  }, [allowedPath, location.pathname, navigate]);

  useCheckAuthentication();

  // Get all userData and display
  Object.entries(currentUserData);
  const userData = (
    <div key={currentUserData._id}>
      Userdata:
      <p>Email: {currentUserData.email} </p>
      <p>Username: {currentUserData.username} </p>
    </div>
  );

  return (
    <>
      <Navigation />
      {userData}
    </>
  );

  /* return (
    <>
      <Navigation />
      <h1>Welcome {username}</h1>
      {filteredUser.map((user) => (
        <div key={user._id}>
          Userdata:
          <p>Email: {user.email} </p>
          <p>Username: {user.username} </p>
        </div>
      ))}
    </>
  ); */
}

export default User;

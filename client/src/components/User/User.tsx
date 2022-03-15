import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

function User() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const allUserData = useSelector((state): RootState => state.user.allUser);
  const currentUserName = useSelector(
    (state): RootState => state.user.username
  );
  //const currentUserData = useSelector((state): RootState => state.user.user)
  const filteredUser = allUserData.filter((user) => user.username === username);

  //Check if user is on it's personal user page, if not than redirect to login
  const allowedPath = `/user/${currentUserName}`;
  useEffect(() => {
    allowedPath !== location.pathname && navigate("/login");
  }, [allowedPath, location.pathname, navigate]);

  return (
    <>
      <h1>Welcome {username}</h1>
      {filteredUser.map((user) => (
        <div key={user._id}>
          Userdata:
          <p>Email: {user.email} </p>
          <p>Username: {user.username} </p>
        </div>
      ))}
    </>
  );
}

export default User;

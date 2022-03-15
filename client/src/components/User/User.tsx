import { useParams } from "react-router";
import { useSelector } from "react-redux";

function User() {
  const { username } = useParams();
  console.log(username);

  const allUserData = useSelector((state): RootState => state.user.allUser);
  console.log(allUserData);

  const filteredUser = allUserData.filter((user) => user.username === username);
  console.log(filteredUser);

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

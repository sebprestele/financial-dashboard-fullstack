import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";

function User() {
  const [userData, setUserData] = useState<any[]>([]);
  console.log(userData);
  const { username } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/v1/users/`, {}).then((res) => {
      // @ts-ignore
      const user = res.data.filter((user) => user.username === username);
      setUserData(user);
    });
  }, [username]);

  return (
    <>
      <h1>Welcome {username}</h1>
      {userData.map((user) => (
        <div>
          <div>
            Userdata:
            <p>Email: {user.email} </p>
            <p>Username: {user.username} </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default User;

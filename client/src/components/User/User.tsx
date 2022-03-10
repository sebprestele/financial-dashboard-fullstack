import { useState, useEffect } from "react";

function User() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/users/6228c8651ca38a042844473b")
      .then((res) => res.json())
      .then((data) => console.log(data));
    //  setUserData(data))
  }, []);
  console.log(userData);
  return <div>User</div>;
}

export default User;

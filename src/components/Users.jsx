import React, { useState } from "react";
import axios from "axios";
const Users = () => {
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");

      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <button onClick={handleFetch}>get userlist</button>
      {!data ? (
        " no data found to display"
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>First Name</th>
              <th>last name</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          {data.map((el) => (
            <tr key={el.id}>
              <td>{el.first_name}</td>
              <td>{el.last_name}</td>
              <td>{el.email}</td>
              <td>
                <img src={el.avatar} alt={el.first_name} width="50" />
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Users;

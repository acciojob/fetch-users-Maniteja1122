import React, { useState } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users");
      const fetchedUsers = response.data?.data || [];
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>User List</h2>

      <button className="btn" onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Get User List"}
      </button>

      

      {!loading && users.length === 0  && (
        <p data-testid="no-data-message" style={{ marginTop: "10px" }}>
          No data found to display
        </p>
      )}

      {users.length > 0 && (
        <table
          data-testid="user-table"
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.avatar} alt={user.first_name} width="50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

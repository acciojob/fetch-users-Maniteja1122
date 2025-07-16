import React, { useState } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

const Users = () => {
  const [data, setData] = useState([]);       // User list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);   // Error state

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://reqres.in/api/users");
      const users = response.data.data || [];
      setData(users);
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h2>User List</h2>

      <button className="btn" onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Get User List"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {!loading && data.length === 0 && !error && (
        <p style={{ marginTop: "10px" }}>No data found to display</p>
      )}

      {data.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
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

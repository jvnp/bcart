import React, { useState } from "react";

import "./Login.css";

async function loginUser(credentials) {
  return fetch("/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.status !== 200) return { status: "http-error" };
    return res.json();
  });
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser({
      username,
      password,
    }).then((response) => {
      if (response.status === "http-error") {
        setError("Unable to connect!");
      } else if (response.status === "error") {
        setError("User not found!");
      } else {
        setToken(response.token);
      }
    });
  };

  return (
    <div className="login-body">
      <div className="login-page">
        <h1 className="login-title">Bolster Cart Login</h1>
        <div className="form">
          <form className="register-form" onSubmit={handleSubmit}>
            <p className="message">{error && error}</p>
            <label>
              <p className="form-label">Username</p>
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
              <p className="form-label">Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
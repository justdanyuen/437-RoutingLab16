import React from "react";
import { Link, useNavigate } from "react-router";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

const LoginPage = ({ setAuthToken }) => {
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await sendPostRequest("/auth/login", { username, password });
      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token);
        navigate("/");
        return { type: "success", message: "Login successful!" };
      } else if (response.status === 401) {
        return { type: "error", message: "Incorrect username or password." };
      } else {
        return { type: "error", message: "Server error. Please try again later." };
      }
    } catch (error) {
      return { type: "error", message: "Network error. Please try again." };
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <UsernamePasswordForm onSubmit={handleLogin} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
import React from "react";
import { useNavigate } from "react-router";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

const RegisterPage = ({ setAuthToken }) => {
    const navigate = useNavigate();
    const handleRegister = async ({ username, password }) => {
        try {
        const response = await sendPostRequest("/auth/register", { username, password });

        console.log("Raw response:", response);
        console.log("Status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));
        if (response.ok) {
            console.log("response was ok!");
            const data = await response.json();
            console.log("got past data");
            setAuthToken(data.token);
            console.log("still good");
            navigate("/");
            console.log("Nav good");
            return { type: "success", message: "Registration successful!" };
        } else if (response.status === 400) {
            return { type: "error", message: "User already exists." };
        } else {
            return { type: "error", message: "Server error. Please try again later." };
        }
        } catch (error) {
        return { type: "error", message: "Network error. Please try again." };
        }
    };

  return (
    <div>
      <h2>Register a New Account</h2>
      <UsernamePasswordForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
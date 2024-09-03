import { useState } from "react";
import "./Signup.css";
import { assets } from "../../assets/assets";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    // Prepare the data for the API request
    const data = {
      email: email,
      username: username,
      password: password,
      password2:confirmPassword,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setSuccess("Signup successful! You can now login.");
        setError(""); // Clear any previous error
        // Reset form fields
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // If response is not ok, parse the error message
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(
          errorData.error || "Signup failed. Please ensure all fields are filled correctly."
        );
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="Login">
      <div className="main">
        <div className="right-container">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="login-btn1">
              Signup
            </button>
            {error && (
              <p className="error" style={{ color: "red" }}>
                {error}
              </p>
            )}
            {success && (
              <p className="success" style={{ color: "green" }}>
                {success}
              </p>
            )}
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

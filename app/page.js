"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'sonner';

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wholeName, setWholeName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      const url = "http://localhost/tribu/users.php";
      const jsonData = { username, password };

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("Login response:", res.data);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Login successful");
        localStorage.setItem("user", res.data.user_id);
        localStorage.setItem("user_level", res.data.user_level);

        if (res.data.user_level === "admin") {
          setTimeout(() => router.push("/dashboard"), 500);
        } else if (res.data.user_level === "user") {
          setTimeout(() => router.push("/user"), 500);
        } else {
          toast.error("Unrecognized user level");
        }
      }
    } catch (error) {
      if (error.response) {
        console.log("Response error:", error.response.data);
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.log("Request error:", error.request);
        toast.error("No response from server");
      } else {
        console.log("General error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !wholeName) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const url = "http://localhost/tribu/users.php";
      const jsonData = { username, password, wholeName };

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("Register response:", res.data);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Registration successful. You can now log in.");
        setIsRegistering(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Response error:", error.response.data);
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.log("Request error:", error.request);
        toast.error("No response from server");
      } else {
        console.log("General error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("url")) {
      localStorage.setItem("url", "http://localhost/tribu/users.php");
    }
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f4f7', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <Form.Group controlId="formWholeName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={wholeName}
                onChange={(e) => setWholeName(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3">
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Form>
        <Button
          variant="link"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-100 text-center"
        >
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </Button>
      </div>
    </div>
  );
}

export default AuthPage;

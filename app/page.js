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
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTribe, setSelectedTribe] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [tribes, setTribes] = useState([]);
  const [years, setYears] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();


  useEffect(() => {
    // Fetch Tribes and Years
    const fetchTribu = async () => {
      try {
        const formData = new FormData();
        formData.append("operation", "getTribu");
        const res = await axios.post('http://localhost/tribu/tribu.php', formData);
        setTribes(res.data);
      } catch (error) {
        console.error('Error fetching tribes:', error);
      }
    };

    const fetchYear = async () => {
      try {
        const formData = new FormData();
        formData.append("operation", "getyear");
        const res = await axios.post('http://localhost/tribu/students.php', formData);
        setYears(res.data);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchTribu();
    fetchYear();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      const url = "http://localhost/tribu/users.php";
      const jsonData = { username: username, password: password };



      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "login")
      const res = await axios.post(url, formData);
      console.log("RES NI HANDLEREGISTER: ", JSON.stringify(res.data));
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Login successful");
        localStorage.setItem("user", res.data.user_id);
        localStorage.setItem("user_level", res.data.user_level);

        if (res.data[0].user_level === "admin") {
          setTimeout(() => router.push("/dashboard"), 500);
        } else if (res.data[0].user_level === "user") {
          setTimeout(() => router.push("/user"), 500);
        } else {
          toast.error("Unrecognized user level");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !wholeName || !selectedYear || !selectedTribe) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const url = "http://localhost/tribu/students.php";
      const jsonData = {
        fullname: wholeName,          // Use 'name' to match the backend's expectation
        userId: username,         // Use 'userId' for the username
        tribe_id: selectedTribe,   // Use 'tribuId' to match PHP's expected field
        yearlevel_id: selectedYear,
        school_id: schoolId,
        username: username,
        password: password,      // Use 'yearId' to match PHP's expected field
      }

      console.log("JSON DATA: ", JSON.stringify(jsonData));
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "saveStudent");

      const res = await axios.post(url, formData);
      console.log("RES NI HANDLEREGISTER: ", JSON.stringify(res.data));
      if (res.data === 1) {
        toast.success("Registration successful. You can now log in.");
        setIsRegistering(false);
        setUsername("");
        setPassword("");
        setSchoolId("");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f4f7', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <Form.Group controlId="formWholeName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={wholeName}
                  onChange={(e) => setWholeName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formYear" className="mb-3">
                <Form.Label>Year Level</Form.Label>
                <Form.Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select a year level</option>
                  {years.map((year, index) => (
                    <option key={index} value={year.year_id}>{year.year_type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formTribe" className="mb-3">
                <Form.Label>Tribe</Form.Label>
                <Form.Select
                  value={selectedTribe}
                  onChange={(e) => setSelectedTribe(e.target.value)}
                >
                  <option value="">Select a tribe</option>
                  {tribes.map((tribe, index) => (
                    <option key={index} value={tribe.tribu_Id}>{tribe.tribu_Name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
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

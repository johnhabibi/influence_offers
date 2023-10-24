import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here, you can perform validation. For example:
    if (user.username === "" || user.password === "") {
      setErrors(["Please fill in all fields"]);
      return;
    }

    // You can send a POST request to your backend for login here.
    // Example using the Fetch API:
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    try {
      const response = await fetch("/user_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include the CSRF token
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Redirect to the root page upon successful login
        window.location.href = "/"; // You can change the URL as needed
      } else {
        const data = await response.json();
        setErrors([data.error]); // Handle login errors from the server.
      }
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred"]); // Handle network errors.
    }
  };

  return (
    <Container>
      <div>
        {errors.length > 0 && (
          <div>
            <ul>
              {errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;

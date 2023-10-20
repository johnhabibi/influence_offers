import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    birthdate: null,
    gender: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User registration was successful
        // Redirect to a success page or perform other actions
      } else {
        const data = await response.json();
        // Handle errors and display them to the user
        console.error(data.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form>
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="signupForm.username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="signupForm.email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="signupForm.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="signupForm.password_confirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="signupForm.firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="signupForm.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="formDate">
          <Form.Label>Select a Date:</Form.Label>
          <DatePicker
            selected={formData.birthdate} // Use formData.birthdate
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
          />
        </Form.Group>

        {/* Add a submit button for form submission */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default Signup;

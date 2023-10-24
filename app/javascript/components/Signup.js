import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Container, FormSelect } from "react-bootstrap";

const Signup = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    gender: "male",
    email: "",
    password_digest: "",
    password_confirmation: "",
  });

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    try {
      await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(formData),
      });
      // If the request is successful, you can optionally redirect to another page.
      // window.location.href = "/success"; // Change the URL as needed.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form method="post" action="<%= api_v1_users_path %>" ref={formRef}>
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
            <Form.Group controlId="signupForm.password_digest">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password_digest"
                value={formData.password_digest}
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
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <FormSelect
                name="gender" // This is correct
                defaultValue={formData.gender}
                onChange={handleGenderChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormSelect>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="formDate">
              <Form.Label>Birthdate:</Form.Label>
              <Form.Control
                type="text"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                placeholder="MM/DD/YYYY"
              />
            </Form.Group>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { fetchUserData } from "./api";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({}); // Store user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    try {
      const response = await fetch("/user_sessions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      if (response.ok) {
        window.location = "/";
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Influence Offers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link href="/">Recommended Offers</Nav.Link>
                <Nav.Link href="/users/show">My Offers</Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/user_sessions/new">Login</Nav.Link>
                <Nav.Link href="/users/new">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

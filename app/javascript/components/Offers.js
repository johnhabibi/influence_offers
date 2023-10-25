import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

const Offers = () => {
  // Use the useState hook to manage the user's authentication status and user data.
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
      w;
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs once after the component mounts.

  // Function to fetch user data. Replace with your actual API call.
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/v1/user_data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <Container>
      {isAuthenticated ? (
        <div id="welcome-auth">
          <h1>We're glad you're here, {user.first_name}</h1>
          <p>Here are the deals we have for you today</p>
        </div>
      ) : (
        <div id="welcome">
          <h1>Welcome to Influence Offers!</h1>
          <p>Signup to explore the latest offers and deals just for you.</p>
        </div>
      )}
    </Container>
  );
};

export default Offers;

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { fetchUserData, fetchOffers } from "./api";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Offers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);

          const offersData = await fetchOffers(userData);
          setOffers(offersData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <div id="welcome-auth">
            <h1>We're glad you're here, {user.first_name}</h1>
            <p>Here are the deals we have for you today</p>
          </div>
          <div id="offers-list">
            <h2>Available Offers</h2>
            <ListGroup>
              {offers.map((offer) => (
                <ListGroupItem key={offer.id}>
                  <h3>{offer.description}</h3>
                  <p>
                    Age Range: {offer.min_age} - {offer.max_age}
                  </p>
                  <p>Gender: {offer.gender}</p>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </>
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

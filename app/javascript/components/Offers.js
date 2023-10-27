import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { fetchUserData, fetchOffers } from "./api";

const Offers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [offers, setOffers] = useState([]);
  const [displayedOffers, setDisplayedOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);

          const offersData = await fetchOffers(userData);
          setOffers(offersData);
          setDisplayedOffers(offersData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const updateDisplayedOffers = (offerId, isRemove) => {
    setDisplayedOffers((prevOffers) => {
      return isRemove
        ? prevOffers.filter((offer) => offer.id !== offerId)
        : prevOffers;
    });
  };

  const handleAddOffer = (offerId) => {
    fetch(`/api/v1/users/${user.id}/accept_offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offer_id: offerId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Offer accepted successfully") {
          console.log("Offer accepted successfully");
        } else if (data.message === "Offer is already in accepted offers") {
          console.log("Offer is already in accepted offers");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveOffer = (offerId) => {
    fetch(`/api/v1/users/${user.id}/reject_offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offer_id: offerId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Offer rejected successfully") {
          console.log("Offer rejected successfully");
        } else if (data.message === "Offer not found in user's offers") {
          console.log("Offer not found in user's offers");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <div id="welcome-auth">
            <h1>We're glad you're here, {user.first_name}</h1>
            <p>
              These offers are curated just for you! When you see one you'd like
              to use, load them onto your account and redeam as you go!
            </p>
          </div>
          <div id="offers-list">
            <h4>Available Offers</h4>
            <Container>
              <Row xs={1} sm={1} md={2} lg={3}>
                {displayedOffers.map((offer) => (
                  <Col className="mb-2" key={offer.id}>
                    <ListGroup>
                      <ListGroupItem>
                        <Row>
                          <Col>
                            <h5>{offer.description}</h5>
                            <p>
                              Age Range: {offer.min_age} - {offer.max_age}
                            </p>
                            <p>Gender: {offer.gender}</p>
                          </Col>
                        </Row>
                        <Row className="justify-content-start">
                          <Col>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddOffer(offer.id)}
                            >
                              <span className="bi bi-patch-plus me-2"></span>
                              Add Offer
                            </button>
                          </Col>
                          <Col>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleRemoveOffer(offer.id)}
                            >
                              <span className="bi bi-patch-minus me-2"></span>
                              Remove Offer
                            </button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                ))}
              </Row>
            </Container>
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

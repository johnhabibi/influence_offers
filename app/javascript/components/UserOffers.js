import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const UserOffers = () => {
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [rejectedOffers, setRejectedOffers] = useState([]);

  useEffect(() => {
    fetch("/api/v1/user_offers/accepted_offers", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAcceptedOffers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch("/api/v1/user_offers/rejected_offers", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRejectedOffers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Container>
      <div className="my-offers">
        <h1>My Offers</h1>
        <h2>My Accepted Offers</h2>
        <ul>
          {acceptedOffers.map((offer) => (
            <li key={offer.id}>
              {offer.description} (Code: {offer.code})
            </li>
          ))}
        </ul>
        <h2>My Rejected Offers</h2>
        <ul>
          {rejectedOffers.map((offer) => (
            <li key={offer.id}>
              {offer.description} (Code: {offer.code})
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default UserOffers;

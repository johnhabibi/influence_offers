export const fetchUserData = async () => {
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

export const fetchOffers = async (userData) => {
  const { birthdate, gender } = userData;

  console.log("Birthdate:", birthdate);
  console.log("Gender:", gender);

  try {
    const response = await fetch(
      `/api/v1/offers?birthdate=${birthdate}&gender=${gender}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const offersData = await response.json();
      return offersData;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

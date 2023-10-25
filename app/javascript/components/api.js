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

const API_URL = "http://localhost:5000/api";

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

// services/apiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://10.0.2.2:8000";

export const getProfile = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/myprofile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching profile: ${response.status}`);
  }
  return response.json();
};

export const updateProfile = async (payload: any) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Error updating profile: ${response.status}`);
  }
  return response.json();
};

export const getFollowers = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/followers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching followers: ${response.status}`);
  }
  return response.json();
};

export const getFollowings = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/followings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching followings: ${response.status}`);
  }
  return response.json();
};

export const postReview = async (reviewData) => {
  console.log(reviewData)
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  console.log("Connecting to db to post review...")
  const response = await fetch(`${BASE_URL}/reviews/`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error(`Error posting review: ${response.status}`);
  }

  return await response.json();
};

export const fetchEateries = async () => {
  const response = await fetch(`${BASE_URL}/eatery/all/`); 
  if (!response.ok) {
      throw new Error("Failed to fetch eateries");
  }
  return await response.json();
};

export const createUser = async (payload: any) => {
  // Make a POST request to create a user
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Error creating user: ${response.status}`
    );
  }
  return response.json();
};

export const getUserReviews = async (targetUserId: string) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(
    `${BASE_URL}/reviewpreviews/userprofile/${targetUserId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error fetching reviews: ${response.status}`);
  }
  return response.json();
};

export const getReview = async (reviewId: string) => {
  const response = await fetch(`${BASE_URL}/reviews/get/${reviewId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }
  return response.json();
}

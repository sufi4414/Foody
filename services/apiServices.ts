// services/apiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://10.0.2.2:8000";

const getHeaders = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };
};

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

export const fetchEateryById = async (eatery_id) => {
  const jwt = await AsyncStorage.getItem("jwt");
  console.log("Connecting to DB..")
  console.log("Fetching eatery by ID....")

  const response = await fetch(`${BASE_URL}/eatery/get/${eatery_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
      throw new Error("Failed to fetch eateries");
  }
  return await response.json();
};


export const postSavedEatery = async (eateryId) => {
  console.log("EateryID to be saved:", eateryId);
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");

  const response = await fetch(`${BASE_URL}/savelist/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ eatery_id: eateryId }), 
  });

  if (!response.ok) {
    throw new Error(`Error posting eatery data: ${response.status}`);
  }

  return await response.json();
};

export const deleteSavedEatery = async (eateryId: number) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");

  const response = await fetch(`${BASE_URL}/savelist/${eateryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting saved eatery: ${response.status}`);
  }

  return await response.json();
};

export const fetchEateryFeed = async (eatery_id) => {
  const jwt = await AsyncStorage.getItem("jwt");
  console.log("Connecting to DB..")
  console.log("Fetching eatery reviews....")

  const response = await fetch(`${BASE_URL}/reviewpreviews/eatery/${eatery_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
      throw new Error("Failed to fetch eateries");
  }
  return await response.json();
};

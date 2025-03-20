// services/apiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.1.223:8000";

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

export const postReview = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error posting review: ${response.status}`);
  }
  return response.json();
};

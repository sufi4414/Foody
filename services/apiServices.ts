// services/apiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASE_URL = "http://192.168.1.251:8000";
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

export const createUser = async (payload: any) => {
  // Make a POST request to create a user
  const response = await fetch(`${BASE_URL}/user/`, {
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

export const getAllPreferences = async () => {
  const response = await fetch(`${BASE_URL}/preference/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch preferences");
  }
  return response.json();
};
export const getAllUserPreferences = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/preference/user/all`, {
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user's preferences: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
};

// Create a user preference
export const createUserPreference = async (preferenceId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/preference/user/`, {
      method: "POST",
      headers,
      body: JSON.stringify({ preference_id: preferenceId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create user preference: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating user preference:", error);
    throw error;
  }
};

// Delete a user preference
export const deleteUserPreference = async (preferenceId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/preference/user/${preferenceId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete user preference: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting user preference:", error);
    throw error;
  }
};


export const getAllDietary = async () => {
  const response = await fetch(`${BASE_URL}/dietary/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch dietary restrictions");
  }
  return response.json();
};

export const getAllUserDietary = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/dietary/user/all`, {
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user's dietary: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user dietary:", error);
    throw error;
  }
};


export const createUserDietary = async (dietaryId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/dietary/user/`, {
      method: "POST",
      headers,
      body: JSON.stringify({ dietary_id: dietaryId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create user dietary: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating user deitary:", error);
    throw error;
  }
};


export const deleteUserDietary = async (dietaryId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/dietary/user/${dietaryId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete user dietary: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting user dietary:", error);
    throw error;
  }
};

export const followUser = async (target_user_id: string) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ following_id: target_user_id }),
  });
  if (!response.ok) {
    throw new Error("Failed to follow user");
  }
  return response.json();
};


export const unfollowUser = async (target_user_id: string) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/follow/${target_user_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to unfollow user");
  }
  return response.json();
};

export const getOtherUserProfile = async (target_user_id: string) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/user/find/${target_user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
};

export const getOtherUserReviews = async (target_user_id: string) => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");
  const response = await fetch(`${BASE_URL}/reviewpreviews/userprofile/${target_user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch review previews");
  }
  return response.json();
};

export const getSavedEateries = async () => {
  const jwt = await AsyncStorage.getItem("jwt");
  if (!jwt) throw new Error("No JWT token found");

  const response = await fetch(`${BASE_URL}/savelist/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch saved eateries");
  }

  return response.json();
};

export const deleteReview = async (reviewId) => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete reivew: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
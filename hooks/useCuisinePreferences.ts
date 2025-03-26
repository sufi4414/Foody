import { useState, useEffect } from "react";
import { getAllPreferences, getAllUserPreferences } from "@/services/apiServices";

export const useCuisinePreferences = () => {
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [userPreferenceIds, setUserPreferenceIds] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hard coded allowed cuisines (all lowercase for comparison)
  const allowedCuisines = [
    "korean",
    "indian",
    "thai",
    "italian",
    "japanese",
    "chinese",
    "filipino",
    "malay",
    "mediterranean",
    "turkish",
    "french",
    "european",
    "mexican",
    "spanish",
    "western",
    "vietnamese",
  ];

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        // Fetch both all preferences and the user's preferences concurrently
        const [allPrefs, userPrefs] = await Promise.all([
          getAllPreferences(),
          getAllUserPreferences(),
        ]);

        // Filter only allowed preferences (assuming preference_name is a string)
        const filteredPrefs = allPrefs.filter((item) =>
          allowedCuisines.includes(item.preference_name.toLowerCase())
        );

        // Map the filtered preferences to options format
        const options = filteredPrefs.map((item) => ({
          id: item.id,
          label:
            item.preference_name.charAt(0).toUpperCase() +
            item.preference_name.slice(1),
          value: item.preference_name,
        }));

        setCuisineOptions(options);

        const userPrefIds = userPrefs.map((pref) => pref.preference_id);
        // Keep only those user preferences that are in the allowed (and displayed) options
        const allowedUserPrefIds = userPrefIds.filter((id) =>
          options.some((option) => option.id === id)
        );
        setUserPreferenceIds(allowedUserPrefIds);

        // Initialize selected values based on allowed user preferences
        const initialSelectedValues = options
          .filter((option) => allowedUserPrefIds.includes(option.id))
          .map((option) => option.value);

        setSelectedValues(initialSelectedValues);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  return {
    cuisineOptions,
    userPreferenceIds,
    selectedValues,
    setSelectedValues,
    loading,
    error,
  };
};

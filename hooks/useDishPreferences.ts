import { useState, useEffect } from "react";
import { getAllPreferences, getAllUserPreferences } from "@/services/apiServices";
export const useDishPreferences = () => {
  const [dishOptions, setDishOptions] = useState([]);
  const [userPreferenceIds, setUserPreferenceIds] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hard-coded allowed dish names (in lowercase for consistent comparison)
  const allowedDishes = [
    "bubble tea",
    "fruit tea",
    "barbeque",
    "salads",
    "steak",
    "dim sum",
    "burger",
    "fried chicken",
    "pasta",
    "sandwich",
    "sushi",
    "chicken rice",
    "pizza",
    "seafood",
    "ice-cream",
    "waffles",
    "korean bbq",
    "noodles",
    "hot pot",
    "pastries"
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
          allowedDishes.includes(item.preference_name.toLowerCase())
        );

        // Map the filtered preferences to options format
        const options = filteredPrefs.map((item) => ({
          id: item.id,
          label: item.preference_name.charAt(0).toUpperCase() + item.preference_name.slice(1),
          value: item.preference_name,
        }));

        setDishOptions(options);

        const userPrefIds = userPrefs.map((pref) => pref.preference_id);
        // Filter user preferences to only include those in the allowed (and displayed) options
        const allowedUserPrefIds = userPrefIds.filter((id) =>
          options.some((option) => option.id === id)
        );
        setUserPreferenceIds(allowedUserPrefIds);

        // Initialize selected values based on user preferences that are in the allowed list
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
    dishOptions,
    userPreferenceIds,
    selectedValues,
    setSelectedValues,
    loading,
    error,
  };
};
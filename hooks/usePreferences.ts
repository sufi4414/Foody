import { useState, useEffect } from "react";
import { getAllPreferences, getAllUserPreferences } from "@/services/apiServices";

export const usePreferences = () => {
    const [cuisineOptions, setCuisineOptions] = useState([]);
    const [userPreferenceIds, setUserPreferenceIds] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPreferences = async () => {
        try {
          setLoading(true);
          // Fetch both all preferences and the user's preferences concurrently
          const [allPrefs, userPrefs] = await Promise.all([
            getAllPreferences(),
            getAllUserPreferences(),
          ]);
  
          const options = allPrefs.map((item) => ({
            id: item.id,
            label: item.preference_name.charAt(0).toUpperCase() + item.preference_name.slice(1),
            value: item.preference_name,
          }));
  
          setCuisineOptions(options);
  
          const userPrefIds = userPrefs.map((pref) => pref.preference_id);
          setUserPreferenceIds(userPrefIds);
  
          // Initialize selected values based on user preferences
          const initialSelectedValues = options
            .filter((option) => userPrefIds.includes(option.id))
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
// src/hooks/useDietary.ts
import { useState, useEffect } from "react";
import { getAllDietary, getAllUserDietary } from "@/services/apiServices";

export const useDietary = () => {
  const [dietaryOptions, setDietaryOptions] = useState([]);
  const [userDietaryIds, setUserDietaryIds] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both all available dietary options and the user's current dietary selections
        const [allDietary, userDietary] = await Promise.all([
          getAllDietary(),
          getAllUserDietary(),
        ]);

        // Map API response to the expected format
        const options = allDietary.map((item) => ({
          id: item.id,
          label:
            item.dietary_name.charAt(0).toUpperCase() + item.dietary_name.slice(1),
          value: item.dietary_name,
        }));
        setDietaryOptions(options);

        // Extract the dietary IDs from the user's data (assumed to have a property `dietary_id`)
        const userIds = userDietary.map((item) => item.dietary_id);
        setUserDietaryIds(userIds);

        // Initialize the selected values based on the user’s dietary IDs
        const initialSelectedValues = options
          .filter((option) => userIds.includes(option.id))
          .map((option) => option.value);
        setSelectedValues(initialSelectedValues);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    dietaryOptions,
    userDietaryIds,
    selectedValues,
    setSelectedValues,
    loading,
    error,
  };
};

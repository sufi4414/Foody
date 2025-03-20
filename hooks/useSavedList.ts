import { BASE_URL } from "@/services/apiServices";
import { useState, useEffect } from "react";

export interface SavedItem {
  id: string;
  name: string;
  address: string;
  rating: number;
}

export const useSavedList = () => {
  const [savedList, setSavedList] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavedList = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/savelist`, { signal });

      if (!response.ok) {
        throw new Error(`Error fetching saved list: ${response.status}`);
      }

      const data: SavedItem[] = await response.json();
      setSavedList(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchSavedList(controller.signal);

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  return { savedList, loading, error, refetch: fetchSavedList };
};

import { useState } from "react";

export interface Review {
  title: string;
  content: string;
  rating: number;
  eatery_id: number;
}

export const usePostReview = (BASE_URL: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const postReview = async (reviewData: Review) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`Error posting review: ${response.status}`);
      }

      setSuccess(true);
      return await response.json(); // Return response data if needed
    } catch (err: any) {
      setError(err);
      throw err; // Rethrow so the component can handle it
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error, success };
};

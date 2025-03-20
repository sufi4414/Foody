import { useState } from "react";
import { postReview as apiPostReview } from "@/services/apiServices"; 

export interface Review {
  title: string;
  content: string;
  rating: number;
  eatery_id: number;
}

export const usePostReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const postReview = async (reviewData: Review) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      console.log("Posting review...");

      const response = await apiPostReview(reviewData); // Use API service function

      setSuccess(true);
      return response;
    } catch (err: any) {
      console.error("Failed to post review:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading};
};

import { useState, useEffect } from "react";
import { getReview } from "@/services/apiServices";

export interface Review {
    id: number;
    title: string;
    content: string;
    rating: number;
    created_at: string;
    updated_at: string;
    eatery_id: number;
    user_id: string;
  }

  export function useReviewPage(reviewId: string) {
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      setLoading(true);
      getReview(reviewId)
        .then((data) => setReview(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }, [reviewId]);
  
    return { review, loading, error };
  }
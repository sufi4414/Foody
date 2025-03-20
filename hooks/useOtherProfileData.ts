import { useState, useEffect } from "react";
import { getOtherUserProfile, getOtherUserReviews } from "@/services/apiServices";

export interface UserProfile {
    id: string;
    username: string;
    fullname: string;
    avatar_url: string;
    bio: string;
    onboarding: boolean;
    created_at: string;
    updated_at: string;
    isFollowed: boolean;
  }

  export interface ReviewPreview {
    review_id: number;
    eatery_id: number;
    eatery_name: string;
    user_avatar: string;
    username: string;
    preview_img: string | null;
    review_title: string;
    number_of_likes: number;
    is_liked: boolean;
  }



export function useOtherProfileData(target_user_id: string){
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [reviewPreviews, setReviewPreviews] = useState<ReviewPreview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const [userProfile, reviews] = await Promise.all([
            getOtherUserProfile(target_user_id),
            getOtherUserReviews(target_user_id)
          ]);
          setProfile(userProfile);
          setReviewPreviews(reviews);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [target_user_id]);
  
    return { profile, reviewPreviews, loading, error };
  }
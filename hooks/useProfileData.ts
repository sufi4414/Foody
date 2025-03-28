import { useState, useEffect } from "react";
import { getProfile, getFollowers, getFollowings, getUserReviews } from "@/services/apiServices";

export interface ProfileData {
  avatar_url: string;
  bio: string;
  created_at: string;
  fullname: string;
  id: string;
  onboarding: boolean;
  updated_at: string;
  username: string;
  followers?: number;
  following?: number;
}

export interface ReviewPreview {
  review_id: number;
  eatery_id: number;
  eatery_name: string;
  user_avatar: string;
  username: string;
  preview_img: string | null;
  review_title: string;
}

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [reviews, setReviews] = useState<ReviewPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const profileData = await getProfile();
      const followers = await getFollowers();
      const following = await getFollowings();
      profileData.followers = Array.isArray(followers) ? followers.length : 0;
      profileData.following = Array.isArray(following) ? following.length : 0;
      setProfile(profileData);

      if (profileData.id) {
        const reviewsData = await getUserReviews(profileData.id);
        setReviews(reviewsData);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchData();
  }, []);

  return { profile, reviews, loading, error, refetch: fetchData };
};
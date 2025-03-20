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
  number_of_likes: number;
  is_liked: boolean;
}

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [reviews, setReviews] = useState<ReviewPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData: ProfileData = await getProfile();
        const followersData = await getFollowers();
        const followingsData = await getFollowings();
        profileData.followers = Array.isArray(followersData) ? followersData.length : 0;
        profileData.following = Array.isArray(followingsData) ? followingsData.length : 0;
        setProfile(profileData);

        // Once profile is available, fetch reviews using the profile ID.
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

    fetchData();
  }, []);

  return { profile, reviews, loading, error };
};
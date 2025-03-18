// hooks/useProfileData.ts
import { useState, useEffect } from "react";
import { getProfile, getFollowers, getFollowings } from "@/services/apiServices";

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

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
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
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, loading, error };
};

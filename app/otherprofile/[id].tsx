import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { OtherProfile } from '@/screens/otherprofile';

export default function OtherProfileScreen() {
  
  const { id } = useLocalSearchParams<{ id: string }>();

  return <OtherProfile profileId={id} />;
}

import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Review } from '@/screens/review';

export default function ReviewScreen() {
  // Extract the review id from the URL (e.g., /review/123 gives id = "123")
  const { id } = useLocalSearchParams<{ id: string }>();

  // Pass the id as a prop to the Review component
  return <Review reviewId={id} />;
}

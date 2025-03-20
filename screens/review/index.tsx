import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useRouter } from "expo-router";
import BookmarkButton from "@/components/custom/bookmarkButton/BookmarkButton";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { FEED_DATA } from "@/schemas/schemas";
import { SwipeableImageCarousel } from "@/components/custom/swipeableimagecarousel";
import {
  Button,
  ButtonText,

} from "@/components/ui/button";
import { useReviewPage } from "@/hooks/useReviewPage";

interface ReviewProps {
  reviewId: string;
}

export function Review({ reviewId }: ReviewProps) {
  const { review, loading, error } = useReviewPage(reviewId);

  if (!review) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Review not found.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <SwipeableImageCarousel />
      <VStack className="p-2 gap-2">
        <HStack className="flex justify-between">
          <Text size="lg" bold style={styles.restaurantName}>
          Eastery id: {review.id}
          </Text>
          <Button
            style={styles.buttonRating}
            size="lg"
            className="rounded-full p-3.5"
            variant="outline"
            disabled
          >
            <ButtonText style={styles.ratingText}>{review.rating}</ButtonText>
          </Button>
        </HStack>
        <Text size="lg" bold>
          {review.title} 
        </Text>
        <Text>{review.content}</Text>
        <Divider />
        <HStack className="flex-row items-center justify-between w-full p-2">
          <BookmarkButton size="xl" className="mr-2" />
        </HStack>
      </VStack>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonRating: {
    width: 25,
    height: 25,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#13B018",
    marginLeft: "auto",
    padding: 0,
  },
  ratingText: {
    color: "#2B2B2B",
    textAlign: "center",
    fontSize: 8, // Adjusted font size to fit within the button
    fontStyle: "normal",
    fontWeight: "300",
    letterSpacing: 0.25,
  },
  restaurantName: {
    color: '#072755',
  },
});
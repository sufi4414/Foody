import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useRouter } from "expo-router";
import HeartButton from "@/components/custom/heartButton/HeartButton";
import BookmarkButton from "@/components/custom/bookmarkButton/BookmarkButton";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { FEED_DATA } from "@/schemas/schemas";
import { SwipeableImageCarousel } from "@/components/custom/swipeableimagecarousel";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";

interface ReviewProps {
  reviewId: string;
}

export function Review({ reviewId }: ReviewProps) {
  const router = useRouter();

  const reviewItem = FEED_DATA.find((item) => item.id === reviewId);

  if (!reviewItem) {
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
            <Text size="lg" bold={true} style={styles.restaurantName}>
              restaurant name placeholder
            </Text>
            
            {/* <Text size="lg" bold={true}>
              5/10
            </Text> */}
            <Button
              style={styles.buttonRating}
              size="lg"
              className="rounded-full p-3.5"
              variant="outline"
              disabled={true}
            >
              <ButtonText style={styles.ratingText}>4</ButtonText>
            </Button>
          </HStack>

          <Text size="lg" bold={true}>
            {reviewItem.title} . id: {reviewId}
          </Text>

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Text>

          <Divider />

          <Box className="flex-row items-center justify-between w-full p-2">
            {/* Left Side: Like Button and Count */}
            <Box className="flex-row items-center">
              {/* <HeartButton size="xl" className="mr-2" />
              <Text size="md" className="text-gray-500">
                100
              </Text> */}
            </Box>

            {/* Right Side: Bookmark Button */}
            <BookmarkButton size="xl" className="mr-2" />
          </Box>
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

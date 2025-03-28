import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { ThreeDotsIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import BookmarkButton from "../bookmarkButton/BookmarkButton";
import { useRouter } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { StyleSheet } from "react-native";
import FeedcardSetting from "../feedcardsetting/FeedcardSetting";

interface FeedCardProps {
  myId: string | null;
  reviewId: number;
  eateryId: number;
  userId: string;
  eateryName: string;
  name: string;
  image: string;
  avatar?: string;
  title: string;
  isBookmarked?: boolean; // New prop for initial bookmark state
}

const FeedCard: React.FC<FeedCardProps> = ({
  myId,
  reviewId,
  eateryId,
  userId,
  eateryName,
  name,
  image,
  avatar,
  title,
  isBookmarked = false, // Default false
}) => {
  const router = useRouter();
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  const handleBookmarkPress = () => {
    setIsBookmarkedState((prev) => !prev);
    console.log("Bookmark Pressed:", !isBookmarkedState);
  };

  const goReview = () => {
    console.log("Review Pressed", reviewId);
    router.push(`/review/${reviewId}`);
  };

  const goEatery = () => {
    router.push(`/(storefront)/${eateryId}`);
  };

  const goProfile = () => {
    if (userId === myId) router.push("/profile");
    else router.push(`/otherprofile/${userId}`);
    console.log("Profile Pressed", userId);
    console.log("My ID", myId);
  };

  return (
    <Card className="p-0 pt-1 w-full m-1 gap-2" size="lg">
      {/* User Info */}
      <Box className="flex-row items-center justify-between p-1">
        <Box className="flex-row items-center">
          <Avatar className="mr-2" size="md">
            <AvatarFallbackText>{name?.charAt(0)}</AvatarFallbackText>
            {avatar && <AvatarImage source={{ uri: avatar }} />}
          </Avatar>
          <VStack>
            <Pressable onPress={goEatery}>
              <Text size="md" bold={true} style={styles.restaurantName}>
                {eateryName}
              </Text>
            </Pressable>

            <Pressable onPress={goProfile}>
              <Text size="md" className="text-gray-500">
                {name}
              </Text>
            </Pressable>
          </VStack>
        </Box>

        {/* <Button size="lg" className="rounded-full mr-2" variant="link">
          <ButtonIcon as={ThreeDotsIcon} />
        </Button> */}
        {myId === userId && <FeedcardSetting reviewId={reviewId} />}
      </Box>

      {/* Post Image */}
      <Box className="flex items-center justify-center w-full">
        <Pressable onPress={goReview}>
          <Image
            source={{ uri: image }}
            className=" w-screen h-auto aspect-square"
            alt="image"
          />
        </Pressable>
      </Box>

      {/* Like and Save Buttons */}
      <Box className="flex-row items-center justify-between w-full p-2 ">
        {/* Left Side: Like Button and Count */}
        <Box className="flex-row items-center">
          {/* <HeartButton
            size="xl"
            className="mr-2"
            isFavourite={isFav}
            onPress={handleFavouritePress}
          />
          <Text size="md" className="text-gray-500">
            {numberlikes}
          </Text> */}
          <Text size="md" className="ml-2 mr-2">
            {title}
          </Text>
        </Box>

        {/* Right Side: Bookmark Button */}
        {/* <BookmarkButton
          size="xl"
          className="mr-2"
          isBookmarked={isBookmarkedState}
          onPress={handleBookmarkPress}
        /> */}
      </Box>
    </Card>
  );
};

export { FeedCard };

const styles = StyleSheet.create({
  restaurantName: {
    color: "#072755",
  },
});

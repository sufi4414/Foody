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
import HeartButton from "../heartButton/HeartButton";
import BookmarkButton from "../bookmarkButton/BookmarkButton";

interface FeedCardProps {
  name: string;
  numberlikes: number;
  image: string;
  avatar?: string;
  title: string;
  isFavourite?: boolean; // New prop for initial favourite state
  isBookmarked?: boolean; // New prop for initial bookmark state
}

const FeedCard: React.FC<FeedCardProps> = ({
  name,
  image,
  avatar,
  numberlikes,
  title,
  isFavourite = false, // Default false
  isBookmarked = false, // Default false
}) => {
  // State to manage favourite and bookmark toggles
  const [isFav, setIsFav] = useState(isFavourite);
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  const handleFavouritePress = () => {
    setIsFav((prev) => !prev);
    console.log("Favourite Pressed:", !isFav);
  };

  const handleBookmarkPress = () => {
    setIsBookmarkedState((prev) => !prev);
    console.log("Bookmark Pressed:", !isBookmarkedState);
  };

  return (
    <Card className="p-0 rounded-lg w-full m-1" size="lg">
      {/* User Info */}
      <Box className="flex-row items-center justify-between p-2">
        <Box className="flex-row items-center">
          <Avatar className="mr-2" size="sm">
            <AvatarFallbackText>{name?.charAt(0)}</AvatarFallbackText>
            {avatar && <AvatarImage source={{ uri: avatar }} />}
          </Avatar>
          <VStack>
            <Text size="lg" bold={true}>
              {name}
            </Text>
          </VStack>
        </Box>

        <Button size="lg" className="rounded-full mr-2" variant="link">
          <ButtonIcon as={ThreeDotsIcon} />
        </Button>
      </Box>

      {/* Post Image */}
      <Box className="flex items-center justify-center w-full">
        <Image
          source={{ uri: image }}
          className="rounded-md w-full h-auto aspect-square sm:w-72 sm:h-72"
          alt="image"
        />
      </Box>

      {/* Like and Save Buttons */}
      <Box className="flex-row items-center justify-between w-full p-2">
        {/* Left Side: Like Button and Count */}
        <Box className="flex-row items-center">
          <HeartButton
            size="xl"
            className="mr-2"
            isFavourite={isFav}
            onPress={handleFavouritePress}
          />
          <Text size="md" className="text-gray-500">
            {numberlikes}
          </Text>
        </Box>

        {/* Right Side: Bookmark Button */}
        <BookmarkButton
          size="xl"
          className="mr-2"
          isBookmarked={isBookmarkedState}
          onPress={handleBookmarkPress}
        />
      </Box>

      {/* Captions */}
      <Text size="md" className="ml-2 mr-2 mb-2">
        {title}
      </Text>
    </Card>
  );
};

export { FeedCard };
import React from "react";
import { StyleSheet } from "react-native";
import { MobileHeader } from "@/components/custom/mobileheader";
import { Ellipsis } from "lucide-react-native";
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

interface ReviewProps {
  reviewId: string;
}

export function Review({ reviewId }: ReviewProps) {
  const router = useRouter();
  const backtoprofile = () => {
    router.push("/tabs/profile");
  };
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
      <MobileHeader title={"marc gabriel"} onLeftPress={backtoprofile} />
      <ScrollView>
        <Image
          source={{
            uri: reviewItem.image,
          }}
          className=" w-full h-auto aspect-square sm:w-72 sm:h-72"
          alt="image"
        />
        <VStack className="p-2 gap-2">
          <HStack className="flex justify-between">
            <Text size="lg" bold={true}>
              restaurant name placeholder
            </Text>
            <Text size="lg" bold={true}>
              5/10
            </Text>
          </HStack>

          <Text size="md" bold={true}>
            Friends that visited
          </Text>

          <HStack>
            <AvatarGroup className="p-2">
              <Avatar size="sm">
                <AvatarFallbackText>John Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <Avatar size="sm">
                <AvatarFallbackText>John Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                />
              </Avatar>
              <Avatar size="sm">
                <AvatarFallbackText>John Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <Avatar size="sm">
                <AvatarFallbackText>John Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                />
              </Avatar>
            </AvatarGroup>
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
              <HeartButton size="xl" className="mr-2" />
              <Text size="md" className="text-gray-500">
                100
              </Text>
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
});

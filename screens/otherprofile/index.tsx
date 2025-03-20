import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { FeedCard } from "@/components/custom/feedcard";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Divider } from "@/components/ui/divider";
import React , {useState} from "react";
import { useRouter } from "expo-router";
import { useOtherProfileData } from "@/hooks/useOtherProfileData";
import { useAuth } from "@/providers/AuthProviders";
import { followUser } from "@/services/apiServices";

interface OtherProfileProps {
  profileId: string;
}

const MainContent: React.FC<OtherProfileProps> = ({ profileId }) => {
  const router = useRouter();

  const { myId } = useAuth();

  const { profile, reviewPreviews, loading, error } = useOtherProfileData(profileId);

  if (loading) {
    return (
      <Center className="mt-14">
        <Text>Loading Profile...</Text>
      </Center>
    );
  }

  if (error || !profile) {
    return (
      <Center className="mt-14">
        <Text>Error loading profile</Text>
      </Center>
    );
  }

  const follow = async () => {
    try {
      const result = await followUser(profileId);
      console.log("User followed successfully:", result);
    } catch (err) {
      console.error("Failed to follow user:", err);
    }
  };

  return (
    <Center className="md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
      <VStack space="lg" className="items-center">
        <Avatar size="2xl" className="bg-primary-600">
          <AvatarImage alt="Profile Image" source={{ uri: profile.avatar_url }} />
        </Avatar>

        <VStack className="gap-1 w-full items-center">
          <Text size="2xl" className="font-roboto text-dark">
            {profile.fullname}
          </Text>
          <Text className="font-roboto text-sm text-typograpphy-700">
            {profile.bio}
          </Text>
        </VStack>

        <HStack space="md">
          <Button
            variant="outline"
            action="secondary"
            onPress={follow}
            className="gap-3 relative"
          >
            <ButtonText className="text-dark">Follow</ButtonText>
          </Button>
        </HStack>
      </VStack>

      {reviewPreviews.map((review) => (
        <FeedCard
          myId={myId}
          key={review.review_id}
          userId={profile.id}
          reviewId={review.review_id}
          eateryId={review.eatery_id}
          isBookmarked={review.is_liked}
          name={review.username}
          image={review.preview_img || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="}
          avatar={profile.avatar_url}
          title={review.review_title}
        />
      ))}
    </Center>
  );
};

export const OtherProfile = ({ profileId }: OtherProfileProps) => {
  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <MainContent profileId={profileId} />
      </ScrollView>
    </SafeAreaView>
  );
};

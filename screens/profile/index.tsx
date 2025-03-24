import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { EditIcon } from "@/components/ui/icon";
import { FeedCard } from "@/components/custom/feedcard";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { NutOff } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import { useRouter } from "expo-router";
import { useProfileData } from "@/hooks/useProfileData";
import ProfileMenu from "@/components/custom/profileMenu/ProfileMenu";
import { Box } from "@/components/ui/box";

const MainContent = () => {
  const router = useRouter();
  const { profile, reviews, loading, error } = useProfileData();
  const [myId, setMyId] = useState<string>("");

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setMyId(session.user.id);
      }
    };
    fetchSession();
  }, []);

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

  const editDietary = () => {
    router.push("/onboarding/step1");
  };

  const editProfile = () => {
    router.push("/edits/editprofile");
  };

  return (
    <>
      <Box className="absolute top-0 right-0 z-10 p-4">
        <ProfileMenu />
      </Box>
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
          <HStack className="items-center gap-1">
            {[
              { value: profile.following, label: "Following" },
              { value: profile.followers, label: "Followers" },
            ].map((data, i) => (
              <React.Fragment key={i}>
                <VStack className="py-3 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold">
                    {data.value}
                  </Text>
                  <Text className="text-dark text-xs font-roboto">{data.label}</Text>
                </VStack>
                {i < 1 && <Divider orientation="vertical" className="h-10" />}
              </React.Fragment>
            ))}
          </HStack>
          <HStack space="md">
            <Button variant="outline" action="secondary" onPress={editProfile} className="gap-3 relative">
              <ButtonText className="text-dark">Edit Profile</ButtonText>
              <ButtonIcon as={EditIcon} />
            </Button>
            <Button variant="outline" action="secondary" onPress={editDietary} className="gap-3 relative">
              <ButtonText className="text-dark">Edit Dietary</ButtonText>
              <ButtonIcon as={NutOff} />
            </Button>
          </HStack>
        </VStack>

        {reviews.map((review) => (
          <FeedCard
            key={review.review_id}
            myId={myId}
            userId={profile.id}
            reviewId={review.review_id}
            eateryId={review.eatery_id}
            eateryName={review.eatery_name}
            name={review.username}
            image={"your_image_url_here"} // Replace with the proper image source as needed
            avatar={profile.avatar_url}
            title={review.review_title}
            isBookmarked={false}
          />
        ))}
      </Center>
    </>
  );
};

export const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

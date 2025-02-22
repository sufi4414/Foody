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
import { EditIcon } from "@/components/ui/icon";
import { FeedCard } from "@/components/custom/feedcard";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Ellipsis, NutOff } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import React from "react";
import { MobileHeader } from "@/components/custom/mobileheader";
import { useRouter } from "expo-router";
import { sampleUser } from "@/schemas/schemas";

interface FeedData {
  name: string;
  image: string;
  avatar: string;
  numberlikes: number;
  title: string;
  isFavourite?: boolean;
  isBookmarked?: boolean;
}

const FEED_DATA: FeedData[] = [
  {
    name: "Marc",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/ship.png",
    numberlikes: 100,
    title: "Delicious Food",
    isFavourite: true,
  },
  {
    name: "John",
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
    title: "good food and great company lorem ipsum dolor asjdhsajd hsdfhjsakdfh s gfsjfdgsafdg shjafdg asfkdh",
    isFavourite: true,
    isBookmarked: true,
  },
  {
    name: "John",
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
    title: "Delicious Food",
  },
];



const MainContent = () => {
  
  const router = useRouter();

  const editDietary = () => {
    router.push("/onboarding/step1"); 
  };
  const editProfile = () => {
    router.push("/edits/editprofile"); 
  };

  return (
    <Center className=" md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4 mt-4">
      <VStack space="lg" className="items-center">
        <Avatar size="2xl" className="bg-primary-600">
          <AvatarImage
            alt="Profile Image"
            source={{
              uri: sampleUser.profilePicture,
            }}
          />
        </Avatar>

        <VStack className="gap-1 w-full items-center">
          <Text size="2xl" className="font-roboto text-dark">
            {sampleUser.fullName}
          </Text>
          <Text className="font-roboto text-sm text-typograpphy-700">{sampleUser.bio}</Text>
        </VStack>

        <HStack className="items-center gap-1">
          {[
            { value: sampleUser.following, label: "Following" },
            { value: sampleUser.followers, label: "Followers" },
          ].map((data, i) => (
            <React.Fragment key={i}>
              <VStack className="py-3 px-4 items-center" space="xs">
                <Text className="text-dark font-roboto font-semibold">
                  {data.value}
                </Text>
                <Text className="text-dark text-xs font-roboto">
                  {data.label}
                </Text>
              </VStack>
              {i < 1 && <Divider orientation="vertical" className="h-10" />}
            </React.Fragment>
          ))}
        </HStack>

        <HStack space="md">
          <Button
            variant="outline"
            action="secondary"
            onPress={editProfile}
            className="gap-3 relative"
          >
            <ButtonText className="text-dark">Edit Profile</ButtonText>
            <ButtonIcon as={EditIcon} />
          </Button>

          <Button
            variant="outline"
            action="secondary"
            onPress={editDietary}
            className="gap-3 relative"
          >
            <ButtonText className="text-dark">Edit Dietary</ButtonText>
            <ButtonIcon as={NutOff} />
          </Button>
        </HStack>

        {/* <HStack space="md">
          <Button size="sm" variant="outline">
            <ButtonText>Been to</ButtonText>
          </Button>
          <Button size="sm" variant="outline">
            <ButtonText>Reviewed</ButtonText>
          </Button>
        </HStack> */}
      </VStack>

      {FEED_DATA.map((feed, index) => (
        <FeedCard
          key={index}
          isFavourite={feed.isFavourite}
          isBookmarked={feed.isBookmarked}
          name={sampleUser.username}
          image={feed.image}
          avatar={sampleUser.profilePicture}
          numberlikes={feed.numberlikes}
          title={feed.title}
        />
      ))}
    </Center>
  );
};

export const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <MobileHeader
        title={sampleUser.username}
        onLeftPress={() => console.log("Back Pressed")}
        rightIcon={Ellipsis}
      />
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

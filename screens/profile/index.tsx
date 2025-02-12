import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { ShareIcon, EditIcon } from "@/components/ui/icon";
import { FeedCard } from "@/components/custom/feedcard";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {Ellipsis} from 'lucide-react-native';
import { Divider } from "@/components/ui/divider";
import React, { useState, useRef } from "react";
import { MobileHeader } from "@/components/custom/mobileheader";

interface FeedData {
  name: string;
  image: string;
  avatar: string;
  numberlikes: number;
}

const FEED_DATA: FeedData[] = [
  {
    name: "Marc",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/ship.png",
    numberlikes: 100,
  },
  {
    name: "John",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
  },
  {
    name: "John",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    avatar: "https://gluestack.github.io/public-blog-video-assets/parrot.png",
    numberlikes: 3,
  },
];

interface UserStats {
  friends: string;
  friendsText: string;
  followers: string;
  followersText: string;
  posts: string;
  postsText: string;
}
const userData: UserStats[] = [
  {
    friends: "45",
    friendsText: "Following",
    followers: "50",
    followersText: "Followers",
    posts: "346",
    postsText: "Posts",
  },
];

const MainContent = () => {
  const [showModal, setShowModal] = useState(false);

  return (

    <Center className="absolute md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
      <VStack space="lg" className="items-center">
        <Avatar size="2xl" className="bg-primary-600">
          <AvatarImage
            alt="Profile Image"
            source={
              "https://gluestack.github.io/public-blog-video-assets/dear.png"
            }
          />
        </Avatar>

        <VStack className="gap-1 w-full items-center">
          <Text size="2xl" className="font-roboto text-dark">
            @Marc
          </Text>
          <Text className="font-roboto text-sm text-typograpphy-700">Bio</Text>
        </VStack>

        <>
          {userData.map((item, index) => (
            <HStack className="items-center gap-1" key={index}>
              {[
                { value: item.friends, label: item.friendsText },
                { value: item.followers, label: item.followersText },
                { value: item.posts, label: item.postsText },
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
                  {i < 3 && <Divider orientation="vertical" className="h-10" />}
                </React.Fragment>
              ))}
            </HStack>
          ))}
        </>

        <Button
          variant="outline"
          action="secondary"
          onPress={() => setShowModal(true)}
          className="gap-3 relative"
        >
          <ButtonText className="text-dark">Edit Profile</ButtonText>
          <ButtonIcon as={EditIcon} />
        </Button>

        <HStack space="md">
          <Button size="sm" variant="outline">
            <ButtonText>Been to</ButtonText>
          </Button>
          <Button size="sm" variant="outline">
            <ButtonText>Reviewed</ButtonText>
          </Button>
        </HStack>
      </VStack>

      {FEED_DATA.map((feed, index) => (
        <FeedCard
          key={index}
          name={feed.name}
          image={feed.image}
          avatar={feed.avatar}
          numberlikes={feed.numberlikes}
        />
      ))}
    </Center>
  );
};

export const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <MobileHeader title="Marc YEEEE" onLeftPress={() => console.log("Back Pressed")} rightIcon={Ellipsis}/>
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Tooltip, TooltipContent, TooltipText } from "@/components/ui/tooltip";
import { ScrollView } from "react-native";
import { FeedCard } from "../feedcard";

const tabsData = [
  {
    name: "FYP",
    data: [
      {
        id: "2",
        name: "John",
        // eatery: "McDonalds",
        image:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "good pancake",
        isFavourite: true,
        isBookmarked: true,
      },
      {
        id: "2",
        name: "John",
        image:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "good food and great company",
        isFavourite: true,
        isBookmarked: true,
      },
      {
        id: "2",
        name: "John",
        image:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "good food and great company",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
  {
    name: "Coffee",
    data: [
      {
        id: "2",
        name: "Marc",
        image:
          "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "good coffee",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
  {
    name: "Beach",
    data: [
      {
        id: "2",
        name: "John",
        image:
          "https://www.netcostmarket.com/wp-content/uploads/2021/05/picnic-on-the-beach.jpg",
        avatar:
          "",
        numberlikes: 3,
        title: "good food and great company",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
  {
    name: "Birthday",
    data: [
      {
        id: "2",
        name: "Gab",
        image:
          "https://curlygirlkitchen.com/wp-content/uploads/2024/01/Rainbow-Cake-High-Altitude-Sprinkles-Lucky-Charms-St-Patricks-Day-007.jpg",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "nice bday food",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
  {
    name: "Movie Night",
    data: [
      {
        id: "2",
        name: "John",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "vibes bro",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
  {
    name: "Chill",
    data: [
      {
        id: "2",
        name: "John",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D",
        avatar:
          "https://gluestack.github.io/public-blog-video-assets/parrot.png",
        numberlikes: 3,
        title: "good food and great company",
        isFavourite: true,
        isBookmarked: true,
      },
    ],
  },
];

const tabs = [
  {
    title: "FYP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPA7v8Fxk7c9ccahRTS_LjFEKcaOmdDF7Bng&s",
  },
  {
    title: "Coffee",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/025/282/026/small/stock-of-mix-a-cup-coffee-latte-more-motive-top-view-foodgraphy-generative-ai-photo.jpg",
  },
  {
    title: "Beach",
    image:
      "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?cs=srgb&dl=pexels-fabianwiktor-994605.jpg&fm=jpg",
  },
  {
    title: "Birthday",
    image:
      "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Movie Night",
    image:
      "https://t3.ftcdn.net/jpg/06/52/50/84/360_F_652508416_PMVJMXZMgnpHmlUIoEnV6xlSTojSwiQ3.jpg",
  },
  {
    title: "Chill",
    image:
      "https://c0.wallpaperflare.com/preview/259/493/306/person-car-cloud-sunset.jpg",
  },
];

const HomeFeedFold = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <Box className="w-full">
      <CatTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabPanelData activeTab={activeTab} />
    </Box>
  );
};

const CatTabs = ({ tabs, activeTab, setActiveTab }: any) => {
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="py-1">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
            {tabs.map((tab: any) => {
              return (
                <Pressable
                  key={tab.title}
                  className={`my-0.5 py-1 ${
                    activeTab === tab ? "border-b-[3px]" : "border-b-0"
                  } border-outline-900 hover:border-b-[3px] ${
                    activeTab === tab
                      ? "hover:border-outline-900"
                      : "hover:border-outline-200"
                  } `}
                  onPress={() => setActiveTab(tab)}
                >
                  <Image
                    source={{ uri: tab.image }}
                    className="w-20 h-20 rounded-xl bg-gray-200"
                    alt = "tab.title"
                  />
                  <Text
                    size="sm"
                    className={`${
                      activeTab === tab
                        ? "text-typography-900"
                        : "text-typography-600"
                    } font-medium`}
                  >
                    {tab.title}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

const TabPanelData = ({ activeTab }: any) => {
  // Find the tab data that matches the active tab title (case-insensitive)
  const currentTabData = tabsData.find(
    (tabData) => tabData.name.toLowerCase() === activeTab.title.toLowerCase()
  );

  return (
    <Box className="mt-0 w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          {currentTabData?.data.map((feedItem: any, index: number) => (
            <FeedCard
              key={feedItem.id + index} // In case ids are not unique
              id={feedItem.id}
              isFavourite={feedItem.isFavourite}
              isBookmarked={feedItem.isBookmarked}
              name={feedItem.name}
              image={feedItem.image}
              avatar={feedItem.avatar}
              numberlikes={feedItem.numberlikes}
              title={feedItem.title}
            />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HomeFeedFold;

import { Box } from "@/components/ui/box";
import { FlatList } from "@/components/ui/flat-list";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import items from "@/data/items.json";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

const SavedPageList = () => {
    const [sortedItems, setSortedItems] = useState([...items].sort((a, b) => b.rating - a.rating));
    const [isSortedHighToLow, setIsSortedHighToLow] = useState(true);
  
    // Function to toggle sorting order
    const toggleSortOrder = () => {
      const newSortedItems = [...sortedItems].reverse(); // Reverse the order
      setSortedItems(newSortedItems);
      setIsSortedHighToLow(!isSortedHighToLow);
    };

  return (
    <Box className="py-10 px-4">
      {/* Filter Button */}
      <Button className ="w-24" variant="outline" action="primary" onPress={toggleSortOrder}>
        <ButtonText>{isSortedHighToLow ? "Score" : "Score"}</ButtonText>
      </Button>

      {/* Heading */}
      {/* <Heading className="text-xl pb-3">Saved Restaurants</Heading> */}

      {/* Restaurant List */}
      <FlatList
        data={sortedItems}
        renderItem={({ item, index }) => (
          <Box className="border-b border-gray-200 dark:border-gray-700 py-2 px-4">
            <HStack className="justify-between items-center">
              <HStack className="space-x-3">
                {/* Numbering */}
                <Text className="text-sm font-bold">{index + 1}.</Text>
                <VStack>
                  <Text className="text-sm font-semibold">{item.name}</Text>
                  {/* <Text className="text-xs font-light text-gray-500 dark:text-gray-400" numberOfLines={1} ellipsizeMode="tail">
                    {item.address}
                  </Text> */}
                </VStack>
              </HStack>
              <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                ⭐ {item.rating}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export const SavedPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <SavedPageList />
    </SafeAreaView>
  );
};

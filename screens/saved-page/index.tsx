import { Box } from "@/components/ui/box";
import { FlatList } from "@/components/ui/flat-list";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import items from "@/data/items.json";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const SavedPageList = () => {
  return (
    <Box className="py-10 px-4">
      <Heading className="text-xl pb-3">Saved Restaurants</Heading>

      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <Box className="border-b border-trueGray800 dark:border-trueGray100 py-2 px-4">
            <HStack className="justify-between items-center">
              <HStack className="space-x-3">
                {/* Numbering before restaurant name */}
                <Text className="text-sm font-bold">{index + 1}.</Text>
                <VStack>
                  <Text className="text-sm font-semibold">{item.name}</Text>
                  {/* <Text className="text-xs text-gray-500 dark:text-gray-400">{item.address}</Text> */}
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

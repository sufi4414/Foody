import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search, X, MapPin, Bookmark } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import React from "react";

const recentSearches = ["Coffee", "Kofta", "Biryani"];

const recentLocations = [
  { name: "Pizzaface", location: "Victoria Road, Singapore" },
  { name: "Zam Zam", location: "Sultan Street, Singapore" },
  { name: "McDonalds", location: "Tampines Ave, Singapore" },
  { name: "Pistachio", location: "Whitelock Place, Singapore" },
];

const MainContent = () => {
  return (
    <VStack space="lg" className="px-4 py-2 space-y-4">
      <Input className="rounded-full border border-purple-400 px-3 py-1.5 w-full">
        <InputSlot className="ml-3">
          <InputIcon as={Search} />
        </InputSlot>
        <InputField placeholder="Search" className="text-sm" />
      </Input>

      <VStack space="md">
        <Text className="text-gray-500 font-semibold">Recent searches</Text>
        {recentSearches.map((item) => (
          <HStack key={item} className="justify-between items-center">
            <HStack space="sm" className="items-center">
              <Search size={16} color="#ccc" />
              <Text>{item}</Text>
            </HStack>
            <X size={16} color="gray" />
          </HStack>
        ))}
      </VStack>

      <VStack space="lg">
        {recentLocations.map((loc) => (
          <>
            <HStack
              key={loc.name}
              className="justify-between items-center border-b border-gray-300 pb-2"
            >
              <HStack space="sm" className="items-center">
                <MapPin />
                <VStack>
                  <Text className="text-gray-800 font-semibold">
                    {loc.name}
                  </Text>
                  <Text className="text-gray-400 text-xs">{loc.location}</Text>
                </VStack>
              </HStack>
              <Bookmark/>
            </HStack>
            <Divider className="my-0.25" />
          </>
        ))}
      </VStack>
    </VStack>
  );
};

export const SearchPage = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Search } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import HomeFeedFold from "@/components/custom/categoriesTabV2";

import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

const MainContent = () => {
const router = useRouter();

  const handleSearchPress = () => {
    router.push("/search/searchpage"); 
  };

  return (
    <>
      <VStack className="px-4 py-2 space-y-4">
        <Text
          size="2xl"
          bold={true}
          className="text-center"
          style={{ fontFamily: "Bungee" }}
        >
          Foody
        </Text>
        <Pressable onPress={handleSearchPress}>
          <Input className="rounded-full px-3 py-1.5 w-full pointer-events-none">
            <InputSlot className="ml-3">
              <InputIcon as={Search} />
            </InputSlot>
            <InputField 
              placeholder="Search" 
              className="text-sm"
              editable={false} // Makes the field uneditable
              pointerEvents="none"
            />
          </Input>
        </Pressable>
      </VStack>
      <>
        <HomeFeedFold />
      </>
    </>
  );
};

export const HomePage = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

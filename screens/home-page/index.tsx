import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Search } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import HomeFeedFold from "@/components/custom/categoriesTabV2";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { useAuth } from "@/providers/AuthProviders";

const MainContent = () => {
  const router = useRouter();
  const { myId } = useAuth();
  const handleSearchPress = () => {
    router.push("/search/searchpage");
  };

  return (
    <>
      <Box className="flex-col items-center">
        <Image
          source={require("./assets/headline.png")}
          className=" w-165 h-37"
          alt="image"
        />
      </Box>

      <VStack className="px-4 py-2 space-y-4">
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
        <HomeFeedFold myId={myId} />
      </>
    </>
  );
};

export const HomePage = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};
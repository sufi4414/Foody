import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Search } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { FEED_DATA } from "@/schemas/schemas";
import { Center } from "@/components/ui/center";
import { FeedCard } from "@/components/custom/feedcard";
import { ScrollView } from "@/components/ui/scroll-view";
import HomeFeedFold from "@/components/custom/categoriesTabV2";

const MainContent = () => {
  return (
    <Center className="gap-0">
      <Text size="2xl" bold={true}>
        Foody
      </Text>
      <Input className="text-center p-2">
        <InputField placeholder="Search" />
        <InputSlot className="mr-3">
          <InputIcon as={Search} />
        </InputSlot>
      </Input>
      <HomeFeedFold />
    </Center>
  );
};

export const HomePage = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

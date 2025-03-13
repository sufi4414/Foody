import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@/components/ui/slider";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";

const AddReview = () => {
  return (
    <VStack space="xl">
    <VStack>
        <Text>Recommend and new spot for others to find</Text>
        <Input>
            <InputField placeholder="Write a cool headline"></InputField>
        </Input>
    </VStack>
    <VStack>
         <Text>Did you take any photos? Add them here..</Text>
         <Input>
            <InputField placeholder="Write a caption to get your audience excited.."></InputField>
        </Input>
    </VStack> 
    <VStack>
         <Text>We need to know where this place is</Text>
         <Input>
            <InputField placeholder="Location"></InputField>
        </Input>
    </VStack> 
    <VStack>
         <Text>How would you rate this place? Add a score</Text>
         <Slider
         defaultValue={2.5}
         minValue={0}
         maxValue={5.0}
         >
            <SliderTrack>
                <SliderFilledTrack/>
            </SliderTrack>
            <SliderThumb/>
         </Slider>
    </VStack>
    <VStack>
         <Button>
            <ButtonText>Post</ButtonText>
         </Button>
    </VStack>  
    </VStack>  
  );
};

export const addReviewPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <AddReview/>
    </SafeAreaView>
  );
};
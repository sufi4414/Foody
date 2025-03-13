import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@/components/ui/slider";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const AddReview = () => {
    const [images, setImages] = useState<(string | null)[]>([null, null, null]); // Allow 3 images

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri;
        setImages(newImages);
      }
  };
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
         <HStack space="xl">
            {images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => pickImage(index)}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 60, height: 60, borderRadius: 10 }} />
                ) : (
                    <Text style={{ fontSize: 24 }}>+</Text>
                )}
                </TouchableOpacity>
            ))}
         </HStack>
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
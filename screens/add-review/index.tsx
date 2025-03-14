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
import { View} from "@/components/ui/view";
import { StyleSheet } from "react-native"

const AddReview = () => {
    const [images, setImages] = useState<(string | null)[]>([null, null, null]); // Allow 3 images
    const [rating, setRating] = useState(2.5); // State to track the slider value

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
    <SafeAreaView style={styles.wrapper}>
    <View style={styles.container}>
    <VStack space="md">
    <VStack space="md">
        <Text>Recommend and new spot for others to find</Text>
        <Input style={styles.input}>
            <InputField placeholder="Write a cool headline"></InputField>
        </Input>
    </VStack>
    <VStack space="md">
         <Text>Did you take any photos? Add them here..</Text>
         <HStack space="4xl">
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
         <Input style={styles.input}>
            <InputField placeholder="Write a caption to get your audience excited.."></InputField>
        </Input>
    </VStack> 
    <VStack space="md">
         <Text>We need to know where this place is</Text>
         <Input style={styles.input}>
            <InputField placeholder="Location"></InputField>
        </Input>
    </VStack> 
    <VStack space="md">
         <Text>How would you rate this place? Add a score</Text>
         <Slider
         defaultValue={2.5}
         minValue={0}
         maxValue={5.0}
         step={0.1}
         onChange={(value) => setRating(value)}
         >
            <SliderTrack style={styles.sliderTrack}>
                <SliderFilledTrack style={styles.sliderFilledTrack}/>
            </SliderTrack>
            <SliderThumb style={styles.sliderTrack}/>
         </Slider>
         <View >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{rating.toFixed(1)}</Text>
        </View> 
    </VStack>  
    </VStack>  
    </View>
    <View style={styles.buttonWrapper}>
            <Button size='lg' style={styles.buttonStyle}>
                <ButtonText style={styles.buttonText}>Post</ButtonText>
            </Button>
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, // Takes full screen height
        justifyContent: 'flex-start', 
        alignItems: "center", // Centers horizontally
        backgroundColor: 'white'
      },
    container: {
        width: "100%", 
        padding: 24,
    },
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "rgba(135, 82, 235, 0.22)",
      paddingVertical: 10,
      alignItems: "center",
      alignSelf: "stretch",
    },
    buttonWrapper: {
        position: 'absolute',
        padding:24,
        bottom: 20,
        width: "100%", 
    },
    buttonStyle: {
        borderRadius: 12,
        backgroundColor: "rgba(135, 82, 235, 0.22)", // Matching color
    },
    buttonText: {
        color: "#000", 
    },
    sliderTrack: {
        backgroundColor: "rgba(135, 82, 235, 0.22)"
    },
    sliderFilledTrack:{
        backgroundColor: "rgba(135, 82, 235, 1)"
    }
  });
  

export const addReviewPage = () => {
  return (
      <AddReview/>
  );
};
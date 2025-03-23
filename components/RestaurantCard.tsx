import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { StyleSheet, TouchableOpacity } from "react-native"
import { View} from "@/components/ui/view";
import { Divider } from '@/components/ui/divider';
import { VStack } from "./ui/vstack";
import { HStack } from "./ui/hstack";
import { Button } from "./ui/button";
import RatingButton from "./custom/ratingButton/RatingButton";
import { Bookmark } from "lucide-react-native";
import { useState } from "react";
import { postSavedEatery } from "@/services/apiServices";

const RestaurantCard = ({eatery_id,name,address,rating}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    console.log("Saved button is pressed..")
    console.log(eatery_id)
    if (!eatery_id) return;
  
    const payload = { eatery_id };

    try {
      setIsSaved(true); // Toggle visual state immediately
      console.log("Saving eatery:", payload);
  
      await postSavedEatery(payload.eatery_id);
  
      console.log("Eatery saved successfully!");
    } catch (error) {
      console.error("Error saving eatery:", error);
      setIsSaved(false); // Rollback on failure
    }
  };
  
  return (
    <View className="rounded-3xl shadow-lg" style={styles.cardContainer} >
    <Card size="lg" variant="filled" className="m-3">
        <VStack space="xl">
        <VStack>
      <Heading size="md" className="mb-1" style={styles.card}>
        {name}
      </Heading>
      </VStack>
      <VStack space="md">
        <HStack>
        <Text size="sm">{address}</Text>
        </HStack>
        <Divider style={styles.divider}/>
      </VStack>
      <VStack>
      <HStack space="xl">
      <Text size="sm">Average Score</Text>
      <RatingButton rating={rating}/>
      <Text size="sm">Friends Score</Text>
      <RatingButton rating={rating}/>
      <TouchableOpacity onPress={handleSave}>
        <Bookmark
          size={23}
          color={isSaved ? "#7C3AED" : "transparent"} // Purple if saved
          stroke={isSaved ? "#7C3AED" : "#6B7280"}    // Outline
        />
      </TouchableOpacity>
      </HStack>
      </VStack>
      </VStack>
    </Card>
    </View>
  )
};
const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 'auto',
        shadowColor: 'rgba(135, 82, 235, 0.22)', // Shadow color
        elevation: 5, // Required for Android shadow
      },
      card: {
        // padding: 16,
        width: 300,
        backgroundColor: 'transparent', 
      },
      divider: {
        borderWidth: 0.5,         // Border width of the divider
        borderColor: 'black',     // Divider color is black
      },

});
export default RestaurantCard;
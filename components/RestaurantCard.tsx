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
import { postSavedEatery, deleteSavedEatery } from "@/services/apiServices";

const RestaurantCard = ({eatery_id,name,address,rating,saved}) => {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = async () => {
    if (!eatery_id) return;
    
  try {
    if (isSaved) {
      console.log("Unsaving eatery:", eatery_id);
      await deleteSavedEatery(eatery_id);
      setIsSaved(false);
      console.log("Eatery unsaved!");
    } else {
      console.log("Saving eatery:", eatery_id);
      await postSavedEatery(eatery_id);
      setIsSaved(true);
      console.log("Eatery saved!");
    }
  } catch (error) {
    console.error("Error toggling saved state:", error);
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
          // color={isSaved ? "#7C3AED" : "transparent"} // Purple if saved
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
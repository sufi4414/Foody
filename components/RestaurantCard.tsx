import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { StyleSheet } from "react-native"
import { View} from "@/components/ui/view";
import { Divider } from '@/components/ui/divider';
import { VStack } from "./ui/vstack";
import { HStack } from "./ui/hstack";
import { Button } from "./ui/button";
import RatingButton from "./custom/ratingButton/RatingButton";

const RestaurantCard = ({id,name,address,rating}) => {
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
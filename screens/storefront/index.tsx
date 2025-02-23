import React from 'react'
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";
import RestaurantCard from '@/components/RestaurantCard';
import { View} from "@/components/ui/view";
import { Image } from '@/components/ui/image';
import sampleImage from "@/screens/storefront/assets/storefront_img.jpg"
import { StyleSheet } from "react-native"
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
const StorefrontPage = ({id,name,address,rating}) => {  
    return (
    <SafeAreaView>
        <View style={styles.container}>
            <Image className='w-full h-72' source={sampleImage} alt=''/> 
            <View style={styles.cardContainer}>
                <RestaurantCard id={id} name={name} address={address} rating={rating}/>
            </View>
            <View style={styles.buttonContainer}>
                <HStack style={styles.buttonHStack} space ='xl'>
                    <Button variant='outline'><ButtonText>Reviews</ButtonText></Button>
                    <Button variant='outline'><ButtonText>Menu</ButtonText></Button>
                    <Button variant='outline'><ButtonText>Reservation</ButtonText></Button>
                </HStack>
            </View>

        </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        
      },
      cardContainer: {
        position: 'absolute',
        top: '70%', // Adjust this value as needed to control the overlap
        left: 0,
        right: 0,
        marginHorizontal: 'auto', 
      },
      buttonContainer: {
        position: 'absolute',
        top: '135%', // Adjust this value as needed to control the overlap
        left: 0,
        right: 0,
        alignSelf:'center',
      },
      buttonHStack: {
        justifyContent: 'center', // Center the buttons within the HStack
      },
})

export default StorefrontPage;

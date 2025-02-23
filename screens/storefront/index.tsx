import React from 'react'
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";
import RestaurantCard from '@/components/RestaurantCard';

const StorefrontPage = ({id,name,address,rating}) => {  
    return (
    <SafeAreaView>
         <RestaurantCard id={id} name={name} address={address} rating={rating}/>
    </SafeAreaView>
    )
};

export default StorefrontPage;

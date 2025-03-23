import React, { useEffect, useState } from 'react'
import { Text } from "@/components/ui/text";
import { ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import RestaurantCard from '@/components/RestaurantCard';
import { View} from "@/components/ui/view";
import { Image } from '@/components/ui/image';
import sampleImage from "@/screens/storefront/assets/storefront_img.jpg"
import { StyleSheet } from "react-native"
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { fetchEateryById } from "@/services/apiServices";
import EateryFeed from '@/screens/storefront/eateryReviews';

const StorefrontPage = ({ eatery_id }) => {  
  console.log("eatery id: ",eatery_id)
    // State to manage the active tab
  const [activeTab, setActiveTab] = useState('reviews'); // Default tab is 'reviews'
  const [eatery, setEatery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEatery = async () => {
      console.log("Loading eatery from store front page...")
      try {
        const data = await fetchEateryById(Number(eatery_id)); // Fetch from API
        setEatery(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch eatery:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eatery_id) {
      loadEatery();
    }
  }, [eatery_id]);
  
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!eatery) {
    return <Text>Eatery not found</Text>;
  }

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'reviews':
        // return <Text>Review for {eatery.name} </Text>;
        return <EateryFeed eatery_id={eatery.id} />;
      case 'menu':
        return <Text>Menu, to be released soon </Text>;
      case 'reservation':
        return <Text>Reservation details, to be released soon</Text>;
      default:
        return <Text>Reviews </Text>;
    }
  };

    return (
    <SafeAreaView>
        <View style={styles.container}>
            <Image className='w-full h-72' source={sampleImage} alt=''/> 
            <View style={styles.cardContainer}>
                <RestaurantCard eatery_id={eatery.id} name={eatery.name} address={eatery.address} rating={eatery.avg_rating}/>
            </View>
            {/* Tab Buttons */}
            <View style={styles.tabs} >
                <TouchableOpacity
                style={[styles.tabButton, activeTab === 'reviews' && styles.activeTab]}
                onPress={() => setActiveTab('reviews')}>
                <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.tabButton, activeTab === 'menu' && styles.activeTab]}
                onPress={() => setActiveTab('menu')}>
                <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.tabButton, activeTab === 'reservation' && styles.activeTab]}
                onPress={() => setActiveTab('reservation')}>
                <Text style={[styles.tabText, activeTab === 'reservation' && styles.activeTabText]}>Reservation</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tabContent}>{renderTabContent()}</View>
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
      tabs: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf:'center',
        top: '130%', // Adjust this value as needed to control the overlap
      },
      tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: 'white',
      },
      activeTab: {
        backgroundColor: 'rgba(135, 82, 235, 0.22))',
      },
      tabText: {
        color: '#969494',
        fontSize: 16,
      },
      tabContent: {
        position: 'absolute',
        alignSelf:'center',
        top: '150%', // Adjust this value as needed to control the overlap
        color: 'black',
      },
      activeTabText: {
        color: 'black',  // Color when the tab is active
      },
})

export default StorefrontPage;

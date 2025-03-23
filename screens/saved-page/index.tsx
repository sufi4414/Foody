import { Box } from "@/components/ui/box";
import { FlatList } from "@/components/ui/flat-list";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import items from "@/data/items.json";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { View } from "@/components/ui/view";  
import { Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button"
import { ChevronDown, ListFilterPlus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'


const SavedPageList = () => {
    const [sortedItems, setSortedItems] = useState([...items].sort((a, b) => b.rating - a.rating));
    const [isSortedHighToLow, setIsSortedHighToLow] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const [isLPressed, setIsLPressed] = useState(false);

    useEffect(()=>{

    })
  
    // Function to toggle sorting order
    const toggleSortOrder = () => {
      const newSortedItems = [...sortedItems].reverse(); // Reverse the order
      setSortedItems(newSortedItems);
      setIsSortedHighToLow(!isSortedHighToLow);
      
      if (isPressed) {
        setIsPressed(false);
      }else {
        setIsPressed(true);
      }
      // console.log("isPressed", isPressed);
    };
    const toggleLocation = async () => {
      supabase.auth.signOut();
      const { data: {session}, error } = await supabase.auth.getSession();
      console.log("Session at saved-page: ",session)
      
      if (isLPressed) {
        setIsLPressed(false);
      }else {
        setIsLPressed(true);
      }
      // console.log("isPressed", isPressed);
    };
    
    const router = useRouter();


  return (

    <VStack className="justify-center items-center" space="xl" style={{flex: 1}}>
      <HStack space="xl">
        <Button  
        style={styles.filterButton}
        variant="outline"
        disabled={true}
        >
          <ButtonIcon as={ListFilterPlus} />
        </Button>
        <Button 
        variant="outline"
        action="primary"
        onPress={toggleSortOrder}
        style={[styles.button, isPressed && styles.buttonPressed]}
        > 
          <View style={styles.buttonContent}>
            <ButtonText>{isSortedHighToLow ? "Score" : "Score"}</ButtonText>
            <ButtonIcon as={ChevronDown} className="ml-2" />
          </View>
        </Button>
       
        <Button 
        variant="outline" 
        action="primary"
        onPress={toggleLocation}
        style={[styles.locationButton, isLPressed && styles.buttonPressed]}
        >
          <View style={styles.buttonContent}>
          <ButtonText>Location</ButtonText>
          <ButtonIcon as={ChevronDown} className="ml-2"></ButtonIcon>
          </View>
        </Button>
      </HStack>

      <FlatList
        style={{flex: 1}}
        contentContainerStyle={styles.flatListContent}
        className="w-full h-full"
        data={sortedItems}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
          onPress={() => router.push({ 
            pathname: '/(storefront)/[id]', 
            params: { 
              id: item.id,
            } })}
          >
          <View>
            <HStack className="items-center" space="md" style={styles.item}> 
              <Text className="text-base font-semibold tracking-wide">{index + 1}.</Text>
                <VStack className="w-auto space-between" style={styles.itemContent}>
                  <Text className="text-base font-semibold tracking-wide">{item.name}</Text>
                  <Text className="text-xs font-extralight tracking-wide" style={styles.address}>{item.address}</Text>
                </VStack>
                <Button 
                style={styles.buttonRating} 
                size="lg" 
                className="rounded-full p-3.5"
                variant="outline"
                disabled={true} 
                >
                  <ButtonText style={styles.ratingText}>{item.avg_rating}</ButtonText>
                </Button>
            </HStack>
          </View>
          </TouchableWithoutFeedback>
            
            
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    
    </VStack>
  );
};

export const SavedPage = () => {
  return (
    <SafeAreaView style={styles.container} className="flex-1 bg-white dark:bg-gray-900">
      <SavedPageList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 button: {
  minHeight: 32,
  width: 113,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#CAC4D0',
},
buttonPressed: {
  backgroundColor: 'rgba(135, 82, 235, 0.22)', 
},
buttonContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
},
locationButton: {
  minHeight: 32,
  width: 174,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#CAC4D0',
},
filterButton: {
  minHeight: 32,
  width: 24,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#CAC4D0',
},
flatListContent: {
  paddingHorizontal: 30, // Add padding to the left and right
  alignSelf: 'stretch',
},
item: {
  flex:1,
  paddingBottom:20, 
  borderBottomWidth: 1,
  borderBottomColor: '#E2E8F0',
},
buttonRating:{
  width: 25,
  height: 25,
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#13B018',
  marginLeft: 'auto',
  padding: 0,
},
ratingText: {
  color: '#2B2B2B',
  textAlign: 'center',
  fontSize: 8, // Adjusted font size to fit within the button
  fontStyle: 'normal',
  fontWeight: '300',
  letterSpacing: 0.25,
},
itemContent: {
  flexShrink: 1,
},
address: {
  flexGrow: 1,
  flexShrink: 1,
},
});

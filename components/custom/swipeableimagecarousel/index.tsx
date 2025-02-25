import React, { useState, useRef } from 'react';
import { Dimensions, FlatList, Image, ViewToken } from 'react-native';
import { Box } from '@/components/ui/box';

const { width } = Dimensions.get('window');

// Default placeholder images (up to 10)
const defaultImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlZSQQLHhRIoluEtg0u8GZ7--xdEx0GX9NA&s",
];

export const SwipeableImageCarousel = ({ images = defaultImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Explicitly type the parameter using ViewToken
  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index!);
      }
    }
  ).current;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <Box className="flex-1">
      {/* Swipeable Image Carousel */}
      <Box className="flex-1">
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => (
            <Box className="flex-row justify-center">
              <Image
                source={{ uri: item }}
                style={{
                  width: width,
                  aspectRatio: 1,
                  resizeMode: 'cover',
                }}
              />
            </Box>
          )}
        />
      </Box>
      {/* Pagination Dots */}
      <Box className="flex-row justify-center mt-4" >
        {images.map((_, idx) => (
          <Box
            key={idx}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: idx === currentIndex ? '#0000ff' : '#cccccc',
              marginHorizontal: 2,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

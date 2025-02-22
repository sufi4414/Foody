import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Bookmark } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

// Define a type for the valid size keys
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BookmarkButtonProps {
  size?: Size;
  className?: string; // Accept className prop
  isBookmarked?: boolean; // New prop to set the initial state  
  onPress?: () => void; // New prop to handle bookmark toggle externally
}

cssInterop(Bookmark, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      stroke: true,
    },
  },
});

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  size = 'md', 
  className = '', 
  isBookmarked = false,
  onPress
}) => {
  const [isPressed, setIsPressed] = useState(isBookmarked);

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (onPress) {
      onPress(); // Call external handler if provided
    }
  };

  // Define the dimensions based on the size prop
  const dimensions: Record<Size, { width: number; height: number }> = {
    xs: { width: 14, height: 14 },
    sm: { width: 16, height: 16 },
    md: { width: 18, height: 18 },
    lg: { width: 18, height: 18 },
    xl: { width: 20, height: 20 },
  };

  const currentSize = dimensions[size];

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, { width: currentSize.width, height: currentSize.height }]}
    >
      <Bookmark
        className={className}
        size={currentSize.width}
        color={isPressed ? '#8752EB' : 'black'}
        fill={isPressed ? '#8752EB' : 'none'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
});

export default BookmarkButton;

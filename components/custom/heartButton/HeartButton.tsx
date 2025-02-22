import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

// Define a type for the valid size keys
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface HeartButtonProps {
  size?: Size;
  className?: string; // Accept className prop
  isFavourite?: boolean; // New prop to determine initial fill
  onPress?: () => void; // New prop for handling press events
}

cssInterop(Heart, {
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

const HeartButton: React.FC<HeartButtonProps> = ({
  size = 'md',
  className = '',
  isFavourite = false,
  onPress, 
}) => {
  const [isPressed, setIsPressed] = useState(isFavourite);

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (onPress) {
      onPress(); // Call the parent handler
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
      <Heart
        className={className}
        size={currentSize.width}
        color={isPressed ? 'red' : 'black'}
        fill={isPressed ? 'red' : 'none'}
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

export default HeartButton;

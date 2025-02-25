import React from "react";
import { Button, ButtonText } from "@/components/ui/button"; // Import from your UI library
import { LinearGradient } from "expo-linear-gradient";

type GradientButtonProps = {
  title: string;
  onPress?: () => void; // Optional press function
  style?: object; // Allows custom styling if needed
};

const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress, style }) => {
  return (
    <LinearGradient
      colors={["#DDD2F2", "#8752EB", "#8752EB", "#DDD2F2"]}
      start={[0, 1]}
      end={[1, 0]}
      className="w-full rounded-full items-center py-2"
      style={style} // Allow custom styles
    >
      <Button className="w-full bg-transparent shadow-none" onPress={onPress}>
        <ButtonText className="font-medium text-white">{title}</ButtonText>
      </Button>
    </LinearGradient>
  );
};

export default GradientButton;

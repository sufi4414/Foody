import * as Icons from "@/components/ui/icon"; 
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";


interface MobileHeaderProps {
  title: string;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title, 
  leftIcon: LeftIcon = Icons.ChevronLeftIcon,  // Default left icon
  rightIcon: RightIcon,  // Optional right icon
  onLeftPress, 
  onRightPress 
}) => {
  // console.log("RightIcon", RightIcon);
  return (
    <HStack
      className="py-3 px-3 border-b border-border-300 bg-background-0 items-center justify-between"
      space="sm"
    >
      <Pressable onPress={onLeftPress}>
        <Icons.Icon as={LeftIcon} size="xl" />
      </Pressable>

      <Text className="text-xl">{title}</Text>

      {RightIcon ? (
        <Pressable onPress={onRightPress}>
          <Icons.Icon as={RightIcon} size="xl"/>
        </Pressable>
      ) : (
         <Text className="text-xl invisible">.</Text> //temp fix for alignment
      )}
      
    </HStack>
  );
};

export { MobileHeader };

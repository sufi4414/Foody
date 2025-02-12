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
  return (
    <HStack
      className="py-3 px-3 border-b border-border-300 bg-background-0 items-center justify-between"
      space="sm"
    >
      <Pressable onPress={onLeftPress}>
        <Icons.Icon as={LeftIcon} />
      </Pressable>

      <Text className="text-xl">{title}</Text>

      {RightIcon ? (
        <Pressable onPress={onRightPress}>
          <Icons.Icon as={RightIcon} />
        </Pressable>
      ) : (
        <div className="w-8" /> // Placeholder to maintain spacing if no right icon
      )}
    </HStack>
  );
};

export { MobileHeader };

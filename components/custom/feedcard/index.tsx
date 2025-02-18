import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Box } from "@/components/ui/box";
  import { Button, ButtonIcon } from "@/components/ui/button";
  import { Card } from "@/components/ui/card";
  import { Heading } from "@/components/ui/heading";
  import { Image } from "@/components/ui/image";
  import { VStack } from "@/components/ui/vstack";
  import { ThreeDotsIcon, FavouriteIcon, ShareIcon } from "@/components/ui/icon";
  import { Text } from "@/components/ui/text";
//   import { Bookmark } from '@/node_modules/lucide-react-native';
  
  interface FeedCardProps {
    name: string;
    numberlikes: number;
    image: string;
    avatar?: string; // Optional avatar image
  }
  
  const FeedCard: React.FC<FeedCardProps> = ({
    name,
    image,
    avatar,
    numberlikes,
  }) => {
    return (
      <Card className="p-3 rounded-lg w-full m-3" size="lg">
        {/* User Info */}
        <Box className="flex-row items-center justify-between">
          <Box className="flex-row items-center">
            <Avatar className="mr-4" size="sm">
              <AvatarFallbackText>{name?.charAt(0)}</AvatarFallbackText>
              {avatar && <AvatarImage source={{ uri: avatar }} />}
            </Avatar>
            <VStack>
              <Heading size="md" className="mb-1">
                {name}
              </Heading>
            </VStack>
          </Box>
  
          <Button size="sm" className="rounded-full p-3.5" variant="link">
            <ButtonIcon as={ThreeDotsIcon} />
          </Button>
        </Box>
  
        {/* Post Image */}
        <Box className="mt-3 flex items-center justify-center w-full">
          <Image
            source={{ uri: image }}
            className="rounded-md w-full h-auto aspect-square sm:w-72 sm:h-72"
            alt="image"
          />
        </Box>
  
        {/* Like Button and save*/}
        <Box className="flex-row items-center justify-between w-full">
          {/* Left Side: Like Button and Count */}
          <Box className="flex-row items-center">
            {" "}
            <Button size="lg" className="rounded-full p-3.5" variant="link">
              <ButtonIcon as={FavouriteIcon} />
            </Button>
            <Text size="sm" className="text-gray-500">
              {" "}
              {numberlikes}
            </Text>{" "}
          </Box>
  
          {/* Right Side: Share Button */}
          <Button size="lg" className="rounded-full p-3.5" variant="link">
            {/* <ButtonIcon as={Bookmark} /> */}
          </Button>
        </Box>
      </Card>
    );
  };
  
  export { FeedCard };
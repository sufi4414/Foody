import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Center } from "@/components/ui/center"
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import { ShareIcon, EditIcon } from "@/components/ui/icon"


export default function Profile() {
  return (
    <Center >
      <VStack space="md" >
      
        <Avatar>
          <AvatarFallbackText>SS</AvatarFallbackText>
          <AvatarImage
            source={require("@/assets/images/shaq.png")}
          />
        </Avatar>

        <VStack>
          <Heading size="sm">Marc</Heading>
          
        </VStack>
        
      
    </VStack>
    
    <HStack space="md">
      <VStack>
        <Heading size="sm">100</Heading>
        <Text size="sm">Followers</Text>
      </VStack>
      <VStack>
        <Heading size="sm">100</Heading>
        <Text size="sm">Following</Text>
      </VStack>
    </HStack>

    <HStack>
      <Text size="sm">edit bio</Text>
    </HStack>


    <HStack space="md">

      <Button size="sm">  
          <ButtonIcon as={EditIcon}  />
          <ButtonText>Edit profile</ButtonText>
      </Button>
      <Button size="sm" >  
          <ButtonIcon as={ShareIcon}  />
          <ButtonText>Share profile</ButtonText>
      </Button>

    </HStack>

    <HStack space="md">
      <Button size="sm" variant="outline">      
          <ButtonText>Been to</ButtonText>
      </Button>
      <Button size="sm" variant="outline" >  
          <ButtonText>Reviewed</ButtonText>
      </Button>
    </HStack>


    </Center>
    
  )
}
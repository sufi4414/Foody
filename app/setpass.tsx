import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
	
export default function Login() {
  return (
    <Center>
          <Box className='p-5 max-w-96 border border-background-300 rounded-lg'>
            <VStack className='pb-4' space='xs'>
              <Heading className='leading-[30px]'>
                Set new password
              </Heading>
              <Text className='text-sm'>
                Almost done. Enter your new password and you are all set.
              </Text>
            </VStack>
            <VStack space='xl' className='py-2'>
              <Input>
                <InputField
                  className='py-2'
                  placeholder='New password'
                />
              </Input>
              <Input>
                <InputField
                  className='py-2'
                  placeholder='Confirm new password'
                />
              </Input>
            </VStack>
            <VStack space='lg' className='pt-4'>
              <Button
                size='sm'
              >
                <ButtonText>
                  Submit
                </ButtonText>
              </Button>
              <Box className='flex flex-row'>
                <Button variant='link' size='sm' className='p-0'>
                  <ButtonIcon
                    className='mr-1'
                    size='md'
                    as={ArrowLeftIcon}
                  />
                  <ButtonText
                  >
                    Back to login
                  </ButtonText>
                </Button>
              </Box>
            </VStack>
          </Box>
        </Center>
  );
}
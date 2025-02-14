import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from "@/components/ui/checkbox";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { CheckIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { MobileHeader } from "@/components/custom/mobileheader";
import { Button, ButtonText } from "@/components/ui/button"; // Assuming you have a Button component
import {useRouter} from 'expo-router';

const MainContent = () => {
    const router = useRouter();

  const [values, setValues] = useState(["dairy"]);

  const handleLogSelection = () => {
    console.log("Selected Dietary Restrictions:", values);
    router.push('/onboarding/step2');  // Redirect to the tabs screen
  };

  return (
    <VStack>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Any dietary restrictions</FormControlLabelText>
        </FormControlLabel>
        <CheckboxGroup
          className="my-2"
          value={values}
          onChange={(keys) => {
            setValues(keys);
          }}
        >
          <VStack space="sm">
            <Checkbox size="sm" value="dairy">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Dairy Allergy</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="gluten">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Gluten Free</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="halal">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Halal</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="vegan">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Vegan</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="nutFree">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Nut Free</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="kosher">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Kosher</CheckboxLabel>
            </Checkbox>
          </VStack>
        </CheckboxGroup>
        <FormControlHelper>
          <FormControlHelperText>
            Select all that apply
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>
      <Button onPress={handleLogSelection}>
          <ButtonText>Done</ButtonText>
      </Button>
    </VStack>
  );
};

export const Step1 = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <MobileHeader
        title="onboarding"
        onLeftPress={() => console.log("Back Pressed")}
      />
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

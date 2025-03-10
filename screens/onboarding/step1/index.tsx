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
import { Button, ButtonText } from "@/components/ui/button"; 
import {useRouter} from 'expo-router';

const dietaryOptions = [
  { label: "Dairy Allergy", value: "dairy" },
  { label: "Gluten Free", value: "gluten" },
  { label: "Halal", value: "halal" },
  { label: "Vegan", value: "vegan" },
  { label: "Nut Free", value: "nutFree" },
  { label: "Kosher", value: "kosher" },
  { label: "Test", value: "test" },
];

const MainContent = () => {
    const router = useRouter();

  const [values, setValues] = useState(["dairy"]);

  const handleLogSelection = () => {
    console.log("Selected Dietary Restrictions:", values);
    router.push('/onboarding/step2');  
  };

  return (
    <VStack className="p-2" space="md">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-lg">Any dietary restrictions</FormControlLabelText>
        </FormControlLabel>
        <CheckboxGroup
          className="my-2"
          value={values}
          onChange={(keys) => {
            setValues(keys);
          }}
        >
          <VStack space="md">
          {dietaryOptions.map((option) => (
              <Checkbox size="md" value={option.value} key={option.value}>
                <CheckboxIndicator className="mr-2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel className="text-base">
                  {option.label}
                </CheckboxLabel>
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
        <FormControlHelper>
          <FormControlHelperText>
            Select all that apply
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>
      <Button onPress={handleLogSelection}>
          <ButtonText>Next</ButtonText>
      </Button>
    </VStack>
  );
};

export const Step1 = () => {

  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

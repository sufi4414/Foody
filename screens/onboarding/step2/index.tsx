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
import { useRouter } from "expo-router";

const cuisineOptions = [
  { label: "Italian", value: "italian" },
  { label: "Chinese", value: "chinese" },
  { label: "Japanese", value: "japanese" },
  { label: "Indian", value: "indian" },
  { label: "Mexican", value: "mexican" },
  { label: "Thai", value: "thai" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "French", value: "french" },
  { label: "Korean", value: "korean" },
  { label: "Vietnamese", value: "vietnamese" },
];

const MainContent = () => {
  const router = useRouter();
  const [values, setValues] = useState([]);

  const handleLogSelection = () => {
    console.log("Selected Cuisines Preferences:", values);
    router.push("/profile");
  };

  return (
    <VStack className="p-2" space="md">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-lg">
            What cuisines do you prefer?
          </FormControlLabelText>
        </FormControlLabel>

        <CheckboxGroup
          className="my-2"
          value={values}
          onChange={(keys) => setValues(keys)}
        >
          <VStack space="md">
            {cuisineOptions.map((option) => (
              <Checkbox size="md" value={option.value} key={option.value}>
                <CheckboxIndicator className="mr-2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>{option.label}</CheckboxLabel>
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>

        <FormControlHelper>
          <FormControlHelperText>Select all that apply</FormControlHelperText>
        </FormControlHelper>
      </FormControl>

      <Button onPress={handleLogSelection}>
        <ButtonText>Done</ButtonText>
      </Button>
    </VStack>
  );
};

export const Step2 = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

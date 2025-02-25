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
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

const MainContent = () => {
  const router = useRouter();
  const [values, setValues] = useState([]);

  const handleLogSelection = () => {
    console.log("Selected Cuisines Preferences:", values);
    router.push("/tabs/profile");
  };

  return (
    <VStack>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>
            What cuisines do you prefer?
          </FormControlLabelText>
        </FormControlLabel>
        <CheckboxGroup
          className="my-2"
          value={values}
          onChange={(keys) => {
            setValues(keys);
          }}
        >
          <VStack space="sm">
            <Checkbox size="sm" value="italian">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Italian</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="chinese">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Chinese</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="japanese">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Japanese</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="indian">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Indian</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="mexican">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Mexican</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="thai">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Thai</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="mediterranean">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Mediterranean</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="french">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>French</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="korean">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Korean</CheckboxLabel>
            </Checkbox>
            <Checkbox size="sm" value="vietnamese">
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Vietnamese</CheckboxLabel>
            </Checkbox>
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
  const router = useRouter();
  const backtoprofile = () => {
    router.push("/tabs/profile");
  };
  return (
    <SafeAreaView className="h-full w-full">
      <MobileHeader title="onboarding" onLeftPress={backtoprofile} />
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

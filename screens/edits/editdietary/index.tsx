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
import { useDietary } from "@/hooks/useDietary";
import { createUserDietary , deleteUserDietary } from "@/services/apiServices";
import { StyleSheet } from "react-native";

const MainContent = () => {
  const router = useRouter();
  const {
    dietaryOptions,
    userDietaryIds,
    selectedValues,
    setSelectedValues,
    loading,
    error,
  } = useDietary();

  const handleLogSelection = async () => {
    // Map the selected dietary names back to their corresponding IDs
    const currentSelectedIds = dietaryOptions
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.id);

    // Determine which dietary restrictions were added or removed
    const added = currentSelectedIds.filter(
      (id) => !userDietaryIds.includes(id)
    );
    const removed = userDietaryIds.filter(
      (id) => !currentSelectedIds.includes(id)
    );

    try {
      // For each added dietary restriction, call the POST endpoint
      for (const id of added) {
        await createUserDietary(id);
      }
      // For each removed dietary restriction, call the DELETE endpoint
      for (const id of removed) {
        await deleteUserDietary(id);
      }
      console.log("Updated dietary restrictions:", selectedValues);
      router.push("/edits/editprofile");
    } catch (err) {
      console.error("Error updating dietary restrictions:", err);
    }
  };

  return (
    <VStack className="p-2" space="md">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-lg">
            Any dietary restrictions?
          </FormControlLabelText>
        </FormControlLabel>
        <CheckboxGroup
          className="my-2"
          value={selectedValues}
          onChange={(keys) => setSelectedValues(keys)}
        >
          <VStack space="md">
            {dietaryOptions.map((option) => (
              <Checkbox size="md" value={option.value} key={option.id}>
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
          <FormControlHelperText>Select all that apply</FormControlHelperText>
        </FormControlHelper>
      </FormControl>
      <Button style={styles.buttonStyle} onPress={handleLogSelection}>
        <ButtonText style={styles.buttonText}>Done</ButtonText>
      </Button>
    </VStack>
  );
};

export const EditDietary = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 12,
    backgroundColor: "rgba(135, 82, 235, 0.22)", // Matching color
  },
  buttonStyle2: {
    borderRadius: 12,
  },
  buttonText: {
    color: "#000",
  },
});
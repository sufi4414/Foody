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
import React, { useState, useEffect } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useDishPreferences } from "@/hooks/useDishPreferences";
import { createUserPreference, deleteUserPreference } from "@/services/apiServices";
import { StyleSheet } from "react-native";

const MainContent = () => {
  const router = useRouter();
  const {
    dishOptions,
    userPreferenceIds,
    selectedValues,
    setSelectedValues,
    loading,
    error,
  } = useDishPreferences();

  const handleLogSelection = async () => {
    try {
      // Map the current selections back to their IDs using cuisineOptions
      const currentSelectedIds = dishOptions
        .filter((option) => selectedValues.includes(option.value))
        .map((option) => option.id);

      // Determine added preferences (in current but not in initial)
      const added = currentSelectedIds.filter(
        (id) => !userPreferenceIds.includes(id)
      );
      // Determine removed preferences (in initial but not in current)
      const removed = userPreferenceIds.filter(
        (id) => !currentSelectedIds.includes(id)
      );

      // For each added preference, call the POST endpoint
      for (const id of added) {
        await createUserPreference(id);
      }
      // For each removed preference, call the DELETE endpoint
      for (const id of removed) {
        await deleteUserPreference(id);
      }

      console.log("Updated user dishes:", selectedValues);
      router.push("/edits/editprofile");
    } catch (error) {
      console.error("Error updating user preferences:", error);
    }
  };
// maybe add some handler for loading and error

  return (
    <VStack className="p-2" space="md">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="text-lg">
            Whats your favourite dish?
          </FormControlLabelText>
        </FormControlLabel>

        <CheckboxGroup
          className="my-2"
          value={selectedValues}
          onChange={(keys) => setSelectedValues(keys)}
        >
          <VStack space="md">
            {dishOptions.map((option) => (
              <Checkbox size="md" value={option.value} key={option.id}>
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

      <Button style={styles.buttonStyle} onPress={handleLogSelection}>
        <ButtonText style={styles.buttonText}>Done</ButtonText>
      </Button>
    </VStack>
  );
};

export const EditDish = () => {
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
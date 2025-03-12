import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { sampleUser } from "@/schemas/schemas";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, Image, View, Text } from "react-native";

const MainContent = () => {
  const router = useRouter();

  // State to manage form data
  const [formData, setFormData] = useState({
    username: sampleUser.username,
    email: sampleUser.email,
    fullName: sampleUser.fullName,
    bio: sampleUser.bio || "", // Handle optional fields
    profilePicture: sampleUser.profilePicture || "", // Handle optional fields
  });

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: result.assets[0].uri,
      }));
    }
  };

  // Handle form submission
  const handleSaveChanges = () => {
    console.log("Updated Profile Data:", formData);
    // Here, you would typically send the updated data to an API or update your state management system.
    router.push("/profile"); // Redirect to the profile screen
  };

  return (
    <VStack space="md" className="p-4">
      <View className="mb-4 items-center">
        <TouchableOpacity onPress={pickImage}>
          {formData.profilePicture ? (
            <Image
              source={{ uri: formData.profilePicture }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#ccc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Upload Picture</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Username Field */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Username</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Username"
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
          />
        </Input>
      </FormControl>

      {/* Full Name Field */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Full Name</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange("fullName", value)}
          />
        </Input>
      </FormControl>

      {/* Bio Field */}
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Bio</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Bio"
            value={formData.bio}
            onChangeText={(value) => handleInputChange("bio", value)}
          />
        </Input>
      </FormControl>

      {/* Save Changes Button */}
      <Button onPress={handleSaveChanges}>
        <ButtonText>Save Changes</ButtonText>
      </Button>
    </VStack>
  );
};

export const EditProfile = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="flex-1">
        <MainContent />
      </ScrollView>
    </SafeAreaView>
  );
};

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
import React, { useState, useEffect } from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { sampleUser } from "@/schemas/schemas";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, Image, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NutOff, Croissant , Pizza } from "lucide-react-native";
import { BASE_URL } from "@/services/apiServices";
import { StyleSheet } from "react-native";

const MainContent = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    bio: "",
    profilePicture: "",
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
      mediaTypes: ['images'],
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwt");
        if (!jwt) {
          console.error("No JWT token found");
          return;
        }
        const profileResponse = await fetch(`${BASE_URL}/user/myprofile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (!profileResponse.ok) {
          console.error("Failed to fetch profile data", profileResponse.status);
          return;
        }
        const data = await profileResponse.json();
        console.log("Fetched Profile Data:", data);
        // Map API response keys to formData keys
        setFormData({
          username: data.username || "",
          email: data.email || "",
          fullName: data.fullname || "",
          bio: data.bio || "",
          profilePicture: data.avatar_url || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    console.log("Updated Profile Data:", formData);
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) {
        console.error("No JWT token found");
        return;
      }
      // Build payload; note keys must match the API's expectations
      const payload = {
        username: formData.username,
        fullname: formData.fullName,
        avatar_url: formData.profilePicture,
        bio: formData.bio,
        // Optionally, include onboarding status if needed:
        // onboarding: false,
      };

      const response = await fetch(`${BASE_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
        return;
      }
      const data = await response.json();
      console.log("Profile updated successfully:", data);
      router.push("/profile"); // Redirect to the profile screen
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const editDietary = () => {
    router.push("/edits/editdietary");
  };

  const editCuisines = () => {
    router.push("/edits/editcuisines");
  };

  const editDish = () => {
    router.push("/edits/editdish");
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

      <Button style={styles.buttonStyle2} variant="outline" action="secondary" onPress={editDietary} className="gap-3 relative">
              <ButtonText style={styles.buttonText}>Edit Dietary</ButtonText>
              <ButtonIcon as={NutOff} />
      </Button>

      <Button style={styles.buttonStyle2} variant="outline" action="secondary" onPress={editCuisines} className="gap-3 relative">
              <ButtonText style={styles.buttonText}>Edit Cuisines</ButtonText>
              <ButtonIcon as={Croissant} />
      </Button>

      <Button style={styles.buttonStyle2} variant="outline" action="secondary" onPress={editDish} className="gap-3 relative">
              <ButtonText style={styles.buttonText}>Edit Dishes</ButtonText>
              <ButtonIcon as={Pizza} />
      </Button>

      {/* Save Changes Button */}
      <Button onPress={handleSaveChanges} style={styles.buttonStyle}>
        <ButtonText style={styles.buttonText}>Save Changes</ButtonText>
      </Button>
    </VStack>
  );
};

export const EditProfile = () => {
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
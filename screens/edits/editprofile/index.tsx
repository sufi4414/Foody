import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack";
import React , {useState} from "react";
import { MobileHeader } from "@/components/custom/mobileheader";
import { Button, ButtonText } from "@/components/ui/button"; // Assuming you have a Button component
import { useRouter } from "expo-router";
import { sampleUser } from "@/schemas/schemas";


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
  
    // Handle form submission
    const handleSaveChanges = () => {
      console.log("Updated Profile Data:", formData);
      // Here, you would typically send the updated data to an API or update your state management system.
      router.push("/profile"); // Redirect to the profile screen
    };
  
    return (
      <VStack space="md" className="p-4">
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
  
        {/* Email Field */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
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
  
        {/* Profile Picture Field */}
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Profile Picture URL</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              placeholder="Profile Picture URL"
              value={formData.profilePicture}
              onChangeText={(value) => handleInputChange("profilePicture", value)}
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

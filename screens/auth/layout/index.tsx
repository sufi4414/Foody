import FoodyIcon from "@/assets/Icons/Foody";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
    <VStack className="flex-1 justify-center items-center">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack className="items-center">
            <FoodyIcon size={150}  />
            {props.children}
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </VStack>
  </SafeAreaView>
  );
};

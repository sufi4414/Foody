import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Settings } from "lucide-react-native";
import React from "react";

const ProfileMenu = (): JSX.Element => {
        const [showActionsheet, setShowActionsheet] = React.useState(false);
        const handleClose = () => setShowActionsheet(false);
        const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session after logout:", error);
      } else {
        console.log("Session after logout:", session);
      }
      router.push("/signin");
      alert("You have been logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };
          return (
            <>
              <Button variant="link" onPress={() => setShowActionsheet(true)}>
                {/* <ButtonText>Open Actionsheet</ButtonText> */}
                <ButtonIcon as={Settings} />
              </Button>
              <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                  <ActionsheetItem onPress={handleLogout}>
                    <ActionsheetItemText>Logout</ActionsheetItemText>
                  </ActionsheetItem>
                  {/* <ActionsheetItem onPress={handleClose}>
                    <ActionsheetItemText>Mark Unread</ActionsheetItemText>
                  </ActionsheetItem>
                  <ActionsheetItem onPress={handleClose}>
                    <ActionsheetItemText>Remind Me</ActionsheetItemText>
                  </ActionsheetItem>
                  <ActionsheetItem onPress={handleClose}>
                    <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
                  </ActionsheetItem>
                  <ActionsheetItem isDisabled onPress={handleClose}>
                    <ActionsheetItemText>Delete</ActionsheetItemText>
                  </ActionsheetItem> */}
                </ActionsheetContent>
              </Actionsheet>
            </>
          );
        }
        export default ProfileMenu;
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Settings } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

const ProfileMenu = (): JSX.Element => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  const router = useRouter();

  const closeAll = () => {
    setShowAlertDialog(false);
    setShowActionsheet(false);
  };

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
      setShowAlertDialog(false);
      setShowActionsheet(false);
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
          <ActionsheetItem
            onPress={() => {
              setShowActionsheet(false);
              setShowAlertDialog(true);
            }}
          >
            <ActionsheetItemText>Logout</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      <AlertDialog isOpen={showAlertDialog} onClose={closeAll} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md">Logout?</Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>Do u wanna logout?</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              style={styles.buttonStyle2}
              variant="outline"
              action="secondary"
              size="sm"
              onPress={closeAll}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button style={styles.buttonStyle} size="sm" onPress={handleLogout}>
              <ButtonText style={styles.buttonText}>Logout</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default ProfileMenu;

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

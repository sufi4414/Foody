import React from "react";
import { useRouter } from "expo-router";
import { ThreeDotsIcon } from "@/components/ui/icon";
import { Button, ButtonIcon } from "@/components/ui/button";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
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
import { deleteReview } from "@/services/apiServices";
import { StyleSheet } from "react-native";

type FeedcardSettingProps = { reviewId: number };

const FeedcardSetting = ({ reviewId }: FeedcardSettingProps) => {
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const closeAll = () => {
    setShowAlertDialog(false);
    setShowActionsheet(false);
  };

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId);
      closeAll();
      
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <>
      <Button variant="link" onPress={() => setShowActionsheet(true)}>
        <ButtonIcon as={ThreeDotsIcon} />
      </Button>

      {/* Actionsheet */}
      <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ActionsheetItem onPress={() => setShowAlertDialog(true)}>
            <ActionsheetItemText>Delete Post</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      {/* Confirm AlertDialog */}
      <AlertDialog isOpen={showAlertDialog} onClose={closeAll} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="md">Delete this post?</Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              This action cannot be undone. Are you sure you want to permanently delete your review?
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button style={styles.buttonStyle2} variant="outline" action="secondary" size="sm" onPress={closeAll}>
              <Text >Cancel</Text>
            </Button>
            <Button style={styles.buttonStyle} size="sm" onPress={handleDelete} >
              <Text style={styles.buttonText}>Delete</Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeedcardSetting;


const styles = StyleSheet.create({
    buttonStyle2: {
        borderRadius: 12,
        // backgroundColor: "rgba(135, 82, 235, 0.22)", // Matching color
    },
    buttonStyle: {
        borderRadius: 12,
        backgroundColor: "rgba(135, 82, 235, 0.22)", // Matching color
    },
    buttonText: {
        color: "#000", 
    },

  });
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    ButtonGroup,
  } from "@/components/ui/button"
import { StyleSheet } from 'react-native';


const RatingButton = ({rating}) => {
  return (
    <Button 
        style={styles.buttonRating} 
        size="lg" 
        className="rounded-full p-3.5"
        variant="outline"
        disabled={true} 
    >
        <ButtonText style={styles.ratingText}>{rating}</ButtonText>
    </Button>
  )
};
const styles = StyleSheet.create({
    buttonRating:{
        width: 25,
        height: 25,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#13B018',
        marginLeft: 'auto',
        padding: 0,
      },
      ratingText: {
        color: '#2B2B2B',
        textAlign: 'center',
        fontSize: 8, 
        fontStyle: 'normal',
        fontWeight: '300',
        letterSpacing: 0.25,
      },
});

export default RatingButton;

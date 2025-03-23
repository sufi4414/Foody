
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import StorefrontPage from "@/screens/storefront";
const Storefront = () => {
    const { id } = useLocalSearchParams();
    console.log("(storefront)", id);
    return(
        <SafeAreaView>
            {/* <StorefrontPage id={id} name={name} address={address} rating={rating}/> */}
            <StorefrontPage eatery_id={ id }/>
        </SafeAreaView>
    )
};
export default Storefront;
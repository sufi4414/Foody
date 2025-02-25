
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import StorefrontPage from "@/screens/storefront";
const Storefront = () => {
    const {id,name,address,rating} = useLocalSearchParams();
    console.log("(storefront)", id,name,address,rating);
    return(
        <SafeAreaView>
            <StorefrontPage id={id} name={name} address={address} rating={rating}/>
        </SafeAreaView>
    )
};
export default Storefront;
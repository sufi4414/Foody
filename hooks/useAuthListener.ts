import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";

const useAuthListener = () => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const jwt = session.access_token;
          try {
            await AsyncStorage.setItem("jwt", jwt);
            console.log("JWT stored in AsyncStorage:", jwt);
          } catch (error) {
            console.error("Error storing JWT", error);
          }
        } else {
          try {
            await AsyncStorage.removeItem("jwt");
            console.log("JWT removed from AsyncStorage");
          } catch (error) {
            console.error("Error removing JWT", error);
          }
        }
      }
    );

    return () => {
      // Cleanup the listener when the component unmounts
      authListener.subscription?.unsubscribe();
    };
  }, []);
};

export default useAuthListener;

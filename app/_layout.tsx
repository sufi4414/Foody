import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot, Stack } from "expo-router";
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'
import SignIn from "./(auth)/signin";
import { Session } from '@supabase/supabase-js'
import "../global.css";
import useAuthListener from "@/hooks/useAuthListener";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  useAuthListener();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const checkAuth = async () => {
    console.log("Checking Auth...");
    const { data: {session}, error } = await supabase.auth.getSession();
    // console.log("Session", session);
    console.log("uid", session?.user.id);
    if (!session) {
      router.push('/signin');
      // router.push('/(tabs)');
  }else{
    // console.log("Access Token:", session.access_token); 
    router.push('/(tabs)');
  }
};
  useEffect(() => {
    checkAuth();
  }, []);

  return <RootLayoutNav />;
}



function RootLayoutNav() {

  return (
    <GluestackUIProvider>
      <Stack>
         <Stack.Screen name="(auth)/signin" options={{headerShown:false}}/>
         <Stack.Screen name="(auth)/signup" options={{headerShown:false}}/>
         <Stack.Screen name="(auth)/forgot-password" options={{headerShown:false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/> 
      </Stack>
    </GluestackUIProvider>
  );
}

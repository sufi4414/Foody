import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { EXPO_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_SUPABASE_URL } from "@/constants/index";

// Ensure Supabase does NOT run on the server (Expo Web SSR fix)
const isBrowser = typeof window !== "undefined";

const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Fix: Prevent creating Supabase on the server (SSR)
const createSupabaseClient = (): SupabaseClient | null => {
  if (!isBrowser) {
    return null; // Prevents "window is not defined" error in SSR
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
};

// ✅ Export Supabase instance (null on server)
export const supabase = createSupabaseClient();

// ✅ Handle Session Auto-Refresh Only on Mobile
if (supabase && !isBrowser) {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}

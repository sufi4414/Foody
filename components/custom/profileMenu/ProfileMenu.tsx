import { Button, ButtonIcon } from "@/components/ui/button";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { MenuIcon } from "@/components/ui/icon";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

const ProfileMenu = (): JSX.Element => {
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
    <Menu
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Button
            {...triggerProps}
            size="sm" 
          >
            <ButtonIcon as={MenuIcon} />
          </Button>
        );
      }}
    >
      <MenuItem
        key="Logout"
        textValue="Logout"
        className="p-2"
        onPress={handleLogout}
      >
        <MenuItemLabel size="sm">Logout</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;

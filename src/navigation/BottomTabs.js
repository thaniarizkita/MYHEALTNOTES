import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import NotesStack from "../navigation/NotesStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: { height: 65, paddingBottom: 8, paddingTop: 8 },

        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          if (route.name === "Notes") iconName = "document-text";
          if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notes" component={NotesStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

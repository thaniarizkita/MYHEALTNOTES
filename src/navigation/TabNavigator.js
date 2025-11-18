import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BloodPressureScreen from '../screens/BloodPressureScreen';
import SleepScreen from '../screens/SleepScreen';
import WaterScreen from '../screens/WaterScreen';
import MoodScreen from '../screens/MoodScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Blood: "pulse",
            Sleep: "moon",
            Water: "water",
            Mood: "happy",
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Blood" component={BloodPressureScreen} />
      <Tab.Screen name="Sleep" component={SleepScreen} />
      <Tab.Screen name="Water" component={WaterScreen} />
      <Tab.Screen name="Mood" component={MoodScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
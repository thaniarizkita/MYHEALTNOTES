import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

import AddNoteScreen from "../components/AddNoteScreen";
import NotesScreen from "../components/NotesScreen";

import BloodListScreen from "../screens/blood/BloodListScreen";
import BloodAddScreen from "../screens/blood/BloodAddScreen";
import BloodEditScreen from "../screens/blood/BloodEditScreen";

import MoodListScreen from "../screens/mood/MoodListScreen";
import MoodAddScreen from "../screens/mood/MoodAddScreen";
import MoodEditScreen from "../screens/mood/MoodEditScreen";

import SleepListScreen from "../screens/sleep/SleepListScreen";
import SleepAddScreen from "../screens/sleep/SleepAddScreen";
import SleepEditScreen from "../screens/sleep/SleepEditScreen";

import WaterListScreen from "../screens/water/WaterListScreen";
import WaterAddScreen from "../screens/water/WaterAddScreen";
import WaterEditScreen from "../screens/water/WaterEditScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* BOTTOM TABS */}
      <Stack.Screen name="Tabs" component={BottomTabs} />

      {/* NOTES */}
      <Stack.Screen name="AddNote" component={AddNoteScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />

      {/* BLOOD */}
      <Stack.Screen name="BloodList" component={BloodListScreen} />
      <Stack.Screen name="BloodAdd" component={BloodAddScreen} />
      <Stack.Screen name="BloodEdit" component={BloodEditScreen} />

      {/* MOOD */}
      <Stack.Screen name="MoodList" component={MoodListScreen} />
      <Stack.Screen name="MoodAdd" component={MoodAddScreen} />
      <Stack.Screen name="MoodEdit" component={MoodEditScreen} />

      {/* SLEEP */}
      <Stack.Screen name="SleepList" component={SleepListScreen} />
      <Stack.Screen name="SleepAdd" component={SleepAddScreen} />
      <Stack.Screen name="SleepEdit" component={SleepEditScreen} />

      {/* WATER */}
      <Stack.Screen name="WaterList" component={WaterListScreen} />
      <Stack.Screen name="WaterAdd" component={WaterAddScreen} />
      <Stack.Screen name="WaterEdit" component={WaterEditScreen} />
    </Stack.Navigator>
  );
}
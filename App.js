import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import HomeStackNavigator from "./src/navigator/Navigation";
import Detail from "./src/Screens/Detail";

export default function App() {
  return (
    <NavigationContainer>
      
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

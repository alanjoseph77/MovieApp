import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Detail from "../Screens/Detail";
import Home from "../Screens/Home";
import MovieScreen from "../Screens/MovieScreen";
import PersonScreen from "../Screens/PersonScreen";

const Stack = createStackNavigator();
const ScreenOptionStyle = {
  headerShown: false,
  statusBarHidden: true
};

const HomeStackNavigator = () => {
  return (
    
    <Stack.Navigator screenOptions={ScreenOptionStyle}>
       
      <Stack.Screen name="Home" component={Home} 
       initialRoute={{ statusBarHidden: true }}/>
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen name="Search" component={Detail} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

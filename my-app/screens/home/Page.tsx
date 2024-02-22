import "react-native-gesture-handler";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import ExpensesPage from "./expenses/Page";
import IncomePage from "./Income/Page";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
        },
      }}
    >
      <Tab.Screen name="Expenses" component={ExpensesPage} />
      <Tab.Screen name="Income" component={IncomePage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomePage;

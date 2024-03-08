import "react-native-gesture-handler";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import ExpensesPage from "./expenses/Page";
import IncomePage from "./Income/Page";

const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Expenses" component={ExpensesPage} />
      <Tab.Screen name="Income" component={IncomePage} />
    </Tab.Navigator>
  );
};

export default HomePage;

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/home/Page";
import CategoriesPage from "./screens/categories/Page";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={{ headerTitle: "" }}
        />
        <Drawer.Screen
          name="Categories"
          component={CategoriesPage}
          options={{ headerTitle: "" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

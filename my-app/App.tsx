import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/home/Page";
import CategoriesPage from "./screens/addCategory/Page";
import AddExpensePage from "./screens/addExpense/Page";
import ExpenseCategoryPage from "./screens/expenseCategory/Page";
import { ExpensesProvider } from "./context/ExpensesProvider";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ExpensesProvider>
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
          <Drawer.Screen
            name="AddExpense"
            component={AddExpensePage}
            options={{
              headerTitle: "",
              drawerItemStyle: { height: 0 },
            }}
          />
          <Drawer.Screen
            name="expenseCategory"
            component={ExpenseCategoryPage}
            options={{
              headerTitle: "",
              drawerItemStyle: { height: 0 },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}

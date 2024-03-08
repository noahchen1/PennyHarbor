import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/home/Page";
import CategoriesPage from "./screens/categories/Page";
import AddExpensePage from "./screens/home/addExpense/Page";
import ExpenseCategoryViewer from "./screens/categories/expenseCategoryViewer/Page";
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
            component={ExpenseCategoryViewer}
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

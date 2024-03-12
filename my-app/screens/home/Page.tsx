import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesPage from "./expenses/Page";
import IncomePage from "./Income/Page";
import { useExpenses } from "../../context/ExpensesProvider";

const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
  const { getExpense } = useExpenses();
  const user = "Noah";

  useEffect(() => {
    try {
      getExpense(user);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Expenses" component={ExpensesPage} />
      <Tab.Screen name="Income" component={IncomePage} />
    </Tab.Navigator>
  );
};

export default HomePage;

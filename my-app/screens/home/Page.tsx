import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesPage from "./expenses/Page";
import IncomePage from "./Income/Page";
import { useExpenses } from "../../context/ExpensesProvider";
import { useAuth } from "../../context/AuthProvider";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
  const { getExpense } = useExpenses();
  const { accounts, user, getAccounts, selectedAccount, setSelectedAccount } = useAuth();

  useEffect(() => {
    try {
      getAccounts();
      getExpense(user);

    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);

  return (

      <Tab.Navigator>
        <Tab.Screen name="Expenses">
          {() => <ExpensesPage selectedAccount={selectedAccount} />}
        </Tab.Screen>
        <Tab.Screen name="Income" component={IncomePage} />
      </Tab.Navigator>

  );
};

export default HomePage;

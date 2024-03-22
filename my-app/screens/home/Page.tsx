import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExpensesPage from "./expenses/Page";
import IncomePage from "./Income/Page";
import { useExpenses } from "../../context/ExpensesProvider";
import { useAuth } from "../../context/AuthProvider";
import { Picker, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
  const { getExpense } = useExpenses();
  const { accounts } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const user = "Noah";

  useEffect(() => {
    try {
      getExpense(user);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);


  return (
    <View>
      <Picker selectedValue={selectedAccount} onValueChange={value => setSelectedAccount(value)}>
        {accounts.map((account, index) => (
          <Picker.item key={index} lable={account} value={account} />
        ))}
      </Picker>
      <Tab.Navigator>
        <Tab.Screen name="Expenses">
          {() => <ExpensesPage selectedAccount={selectedAccount} />}
        </Tab.Screen>
        <Tab.Screen name="Income" component={IncomePage} />
      </Tab.Navigator>
    </View>
  );
};

export default HomePage;

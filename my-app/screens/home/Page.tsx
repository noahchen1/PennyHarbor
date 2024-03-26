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
  const { accounts, user, getAccounts } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

  useEffect(() => {
    try {
      getAccounts();
      getExpense(user);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);
  
  
  return (
    <View>
      {/* <Picker
        selectedValue={selectedAccount}
        onValueChange={(value) => setSelectedAccount(value)}
      >
        {accounts.map((account, index) => (
          <Picker.Item key={index} label={account.name} value={account} />
        ))}
      </Picker> */}
      <Tab.Navigator>
        {/* <Tab.Screen name="Expenses">
          {() => <ExpensesPage selectedAccount={selectedAccount} />}
        </Tab.Screen> */}

        <Tab.Screen name="Expenses" component={ExpensesPage} />
        <Tab.Screen name="Income" component={IncomePage} />
      </Tab.Navigator>
    </View>
  );
};

export default HomePage;

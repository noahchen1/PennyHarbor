import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Picker } from "@react-native-picker/picker";

import HomePage from "./screens/home/Page";
import CategoriesPage from "./screens/addCategory/Page";
import AddExpensePage from "./screens/addExpense/Page";
import ExpenseCategoryPage from "./screens/expenseCategory/Page";
import SignInPage from "./screens/authScreen/signin/Page";
import RegistrationPage from "./screens/authScreen/registration/Page";
import { useAuth } from "./context/AuthProvider";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
const Drawer = createDrawerNavigator();

const Root = () => {
  const { user, setUser, selectedAccount, accounts } = useAuth();

  useEffect(() => {
    initializeApp(firebaseConfig);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user.email));

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAccount}
          onValueChange={(value) => setSelectedAccount(value)}
          style={styles.picker}
        >
          {accounts.map((account, index) => (
            <Picker.Item key={index} label={account.name} value={account} />
          ))}
        </Picker>
      </View>
      <Drawer.Navigator initialRouteName={user ? "Home" : "SignIn"}>
        {user ? (
          <>
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
            <Drawer.Screen
              name="Register"
              component={RegistrationPage}
              options={{ headerTitle: "" }}
            />
          </>
        ) : (
          <Drawer.Screen
            name="SignIn"
            component={SignInPage}
            options={{ headerTitle: "" }}
          />
        )}
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3 0,
  },
  picker: {
    width: '30%',
  },
});

export default Root;

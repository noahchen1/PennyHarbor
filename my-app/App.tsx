import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/home/Page";
import CategoriesPage from "./screens/addCategory/Page";
import AddExpensePage from "./screens/addExpense/Page";
import ExpenseCategoryPage from "./screens/expenseCategory/Page";
import SignInPage from "./screens/authScreen/signin/Page";
import { ExpensesProvider } from "./context/ExpensesProvider";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    initializeApp(firebaseConfig);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));

    return () => unsubscribe();
  }, []);

  return (
    <ExpensesProvider>
      <NavigationContainer>
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
            </>
          ) : (
            <Drawer.Screen
              name="SignIn"
              component={SignInPage}
              options={{ headerTitle: "" }}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}

import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import ExpensesPage from "./screens/home/expenses/Page";
const Drawer = createDrawerNavigator();

const Root = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    initializeApp(firebaseConfig);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user.email));

    return () => unsubscribe();
  }, []);

  return (
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
          <Drawer.Screen
            name="Expenses"
            component={ExpensesPage}
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
  );
};

export default Root;

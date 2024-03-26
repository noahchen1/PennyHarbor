import { NavigationContainer } from "@react-navigation/native";
import { ExpensesProvider } from "./context/ExpensesProvider";
import { AuthProvider } from "./context/AuthProvider";

import Root from "./Root";

export default function App() {

  return (
    <AuthProvider>
      <ExpensesProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ExpensesProvider>
    </AuthProvider>
  );
}

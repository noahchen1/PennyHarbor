import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useExpenses } from "../../../context/ExpensesProvider";

const SignInPage = () => {
  const navigation = useNavigation();
  const { setUser } = useExpenses();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const auth = getAuth();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userId = res.user.uid;

      setUser(userId);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default SignInPage;

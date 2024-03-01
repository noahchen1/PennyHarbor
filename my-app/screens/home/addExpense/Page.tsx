import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import { useNavigation } from "@react-navigation/native";

const AddExpensePage = () => {
  const navigation = useNavigation();

  const { addExpense, getExpense } = useExpenses();
  const user = "Noah";

  const handleAddExpense = async () => {
    await addExpense(data);

    await getExpense(user);
    navigation.navigate("Home");
  };

  
  const [amt, setAmt] = useState("");
  const [categories, setCategories] = useState("");
  const [data, setDate] = useState({
    username: "Noah",
    text: "",
    value: 0,
    color: "#8ba6ca",
    date: "2024-02-29",
  });

  useEffect(() => {
    setDate({
      username: "Noah",
      text: categories,
      value: parseInt(amt),
      color: "#8ba6ca",
      date: "2024-02-29",
    });
  }, [amt, categories]);

  return (
    <View>
      <Text>Add your expense!</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amt}
        onChangeText={setAmt}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={categories}
        onChangeText={setCategories}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddExpensePage;

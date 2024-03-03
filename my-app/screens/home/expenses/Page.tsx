import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";

const ExpensesPage = () => {
  const { getExpense, expenses } = useExpenses();

  const user = "Noah";

  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);

  useEffect(() => {
    try {
      getExpense(user);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);
  return (
    <View>
      <Text>Expenses</Text>
      <Wheel expenses={expenses} />
      {expenses.map((expense, index) => (
        <Catagory total={total} expense={expense} key={index} />
      ))}
    </View>
  );
};

export default ExpensesPage;

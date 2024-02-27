import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";

import React from "react";
import { View, Text } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";

const ExpensesPage = () => {
  const user = "Noah";
  const { getExpense } = useExpenses();
  const expenseArr = [
    { text: "Food", value: 200, color: "#FF5733" },
    { text: "Transportation", value: 300, color: "#33FF57" },
    { text: "Entertainment", value: 150, color: "#5733FF" },
    { text: "Groceries", value: 250, color: "#009FFF" },
  ];

  const total = expenseArr.reduce((acc, expense) => acc + expense.value, 0);

  const fetchExpenses = async () => {
    try {
      const response = await getExpense(user);

      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  fetchExpenses()

  return (
    <View>
      <Text>Expenses</Text>
      <Wheel expenses={expenseArr} />
      {expenseArr.map((expense, index) => (
        <Catagory total={total} expense={expense} key={index} />
      ))}
    </View>
  );
};

export default ExpensesPage;

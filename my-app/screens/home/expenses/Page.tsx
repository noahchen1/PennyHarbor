import "react-native-gesture-handler";

import React from "react";
import { View, Text } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";

const ExpensesPage = () => {
  const expenseArr = [
    { text: "Food", value: 200, color: "#FF5733" },
    { text: "Transportation", value: 300, color: "#33FF57" },
    { text: "Entertainment", value: 150, color: "#5733FF" },
    { text: "Groceries", value: 250, color: "#009FFF" },
  ];

  const total = expenseArr.reduce((acc, expense) => acc + expense.value, 0);
  
  return (
    <View>
      <Text>Expenses</Text>
      <Wheel expenses={expenseArr} />
      {expenseArr.map((expense) => (
        <Catagory total={total} expense={expense} />
      ))}
    </View>
  );
};

export default ExpensesPage;

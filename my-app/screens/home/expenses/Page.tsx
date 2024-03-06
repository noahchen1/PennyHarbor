import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";

const ExpensesPage = () => {
  const { getExpense, expenses, date } = useExpenses();
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const user = "Noah";
  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);

  useEffect(() => {
    try {
      getExpense(user);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }, []);

  useEffect(() => {
    const selectedExpenses = expenses.filter((expense) => {
      const timestamp = new Date(expense.date);

      return (
        date.getDate() === timestamp.getDate() &&
        date.getMonth() === timestamp.getMonth() &&
        date.getFullYear() === timestamp.getFullYear()
      );
    });

    setCurrentExpenses(selectedExpenses);
  }, [date]);

  return (
    <ScrollView>
      <Text>Expenses</Text>
      <Wheel expenses={currentExpenses} />
      {currentExpenses.map((expense, index) => (
        <Catagory total={total} expense={expense} key={index} />
      ))}
    </ScrollView>
  );
};

export default ExpensesPage;

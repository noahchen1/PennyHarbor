import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";

const ExpensesPage = () => {
  const { getExpense, expenses, date, mode } = useExpenses();
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState({});
  const [expenseFound, setExpenseFound] = useState(false);
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

      switch (mode) {
        case "Day":
          return (
            date.getDate() === timestamp.getDate() &&
            date.getMonth() === timestamp.getMonth() &&
            date.getFullYear() === timestamp.getFullYear()
          );

        case "Week":
          const expenseDate = new Date(expense.date);
          const selectedDate = new Date(date);
          const startOfWeek = new Date(date);
          const endOfWeek = new Date(date);
          const startDay = selectedDate.getDate() - selectedDate.getDay();
          const endDay = startDay + 6;

          startOfWeek.setDate(startDay);
          endOfWeek.setDate(endDay);

          return expenseDate >= startOfWeek && expenseDate <= endOfWeek;

        case "Month":
          return (
            date.getMonth() === timestamp.getMonth() &&
            date.getFullYear() === timestamp.getFullYear()
          );

        case "Year":
          return date.getFullYear() === timestamp.getFullYear();

        default:
          return false;
      }
    });

    const groupData = selectedExpenses.reduce((acc, item) => {
      if (!acc[item.text]) {
        acc[item.text] = [];
      }

      acc[item.text].push(item);

      return acc;
    }, {});

    if (!selectedExpenses.length) {
      const placeholder = [
        {
          color: "#009FFF",
          text: "No Data",
          value: Infinity,
        },
      ];

      setCurrentExpenses(placeholder);
      setExpenseFound(false);
    } else {
      setCurrentExpenses(selectedExpenses);
      setGroupExpenses(groupData);
      setExpenseFound(true);
    }
  }, [date, mode, expenses]);


  return (
    <ScrollView>
      <Text>Expenses</Text>
      <Wheel expenses={currentExpenses} />
      {expenseFound &&
        Object.keys(groupExpenses).map((key, index) => (
          <Catagory expenseArr={groupExpenses[key]} category={key} total={total} key={index} />
        ))}
    </ScrollView>
  );
};


export default ExpensesPage;

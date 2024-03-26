import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";
import getSelectedExpenses from "../../../util/getSelectedExpenses";
import getGroupExpenses from "../../../util/getGroupExpenses";
import PLACEHOLDER_EXPENSE from "../../../constants/placeholder_expense";

const ExpensesPage = () => {
  const { expenses, date, dateDisplay } = useExpenses();
  const [expenseData, setExpenseData] = useState({
    currentExpenses: [],
    groupExpenses: {},
    expenseFound: false,
  });

  const total = expenses?.reduce((acc, expense) => acc + expense.value, 0);

  useEffect(() => {
    const selectedExpenses = getSelectedExpenses(expenses, date, dateDisplay);     
    const noExpense = !selectedExpenses.length;

    if (noExpense) {
      setExpenseData({
        currentExpenses: PLACEHOLDER_EXPENSE,
        groupExpenses: {},
        expenseFound: false,
      });
    } else {
      const groupExpenses = getGroupExpenses(selectedExpenses);

      setExpenseData({
        currentExpenses: selectedExpenses,
        groupExpenses: groupExpenses,
        expenseFound: true,
      });
    }
  }, [date, dateDisplay, expenses]);

  return (
    <ScrollView>
      <Text>Expenses</Text>
      <Wheel expenses={expenseData.currentExpenses} />
      {expenseData.expenseFound &&
        Object.keys(expenseData.groupExpenses).map((key, index) => (
          <Catagory expenseArr={expenseData.groupExpenses[key]} category={key} total={total} key={index} />
        ))}
    </ScrollView>
  );
};

export default ExpensesPage;

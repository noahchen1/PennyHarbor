import "react-native-gesture-handler";
import { useExpenses } from "../../../context/ExpensesProvider";
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import Wheel from "../../../components/Wheel";
import Catagory from "../../../components/Catagory";
import getSelectedExpenses from "../../../util/getSelectedExpenses";
import getGroupExpenses from "../../../util/getGroupExpenses";
import WHEEL_PLACEHOLDER from "../../../constants/wheel_placeholder_data";


const ExpensesPage = () => {
  const { expenses, date, dateDisplay } = useExpenses();
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState({});
  const [expenseFound, setExpenseFound] = useState(false);
  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);

  useEffect(() => {
      const selectedExpenses = getSelectedExpenses(expenses, date, dateDisplay);
      const noExpense = !selectedExpenses.length;

      if (noExpense) {
        setCurrentExpenses(WHEEL_PLACEHOLDER);
        setExpenseFound(false);
      } else {
        setCurrentExpenses(selectedExpenses);
        setGroupExpenses(getGroupExpenses(selectedExpenses));
        setExpenseFound(true);
      }
  }, [date, dateDisplay, expenses]);

  return (
    <ScrollView>
      <Text>Expenses</Text>
      <Wheel expenses={currentExpenses} />
      {expenseFound &&
        Object.keys(groupExpenses).map((key, index) => (
          <Catagory
            expenseArr={groupExpenses[key]}
            category={key}
            total={total}
            key={index}
          />
        ))}
    </ScrollView>
  );
};

export default ExpensesPage;

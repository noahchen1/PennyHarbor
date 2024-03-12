import axios from "axios";
import { createContext, useContext, useState } from "react";
import BASE_URL from "../constants/url";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState("Day");

  const getExpense = async (user) => {
    const URL = `${BASE_URL}/expenses/${user}`;

    const res = await axios.get(URL);

    setExpenses(res.data.expenses);
  };

  const addExpense = async (data) => {
    const URL = `${BASE_URL}/add`;

    const res = await axios.post(URL, data);

    setExpenses(res.data.expenses);
  };

  const addCatagory = async (data) => {
    const URL = `${BASE_URL}/category`;

    const res = await axios.post(URL, data);

    setCategories(res.data.categories);
  };

  const getCategories = async (user) => {
    const URL = `${BASE_URL}/category/${user}`;

    const res = await axios.get(URL);

    setCategories(res.data.categories);
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        categories,
        setExpenses,
        getExpense,
        addExpense,
        addCatagory,
        getCategories,
        setCategories,
        date,
        setDate,
        dateDisplay,
        setDateDisplay,
        expenseCategory,
        setExpenseCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

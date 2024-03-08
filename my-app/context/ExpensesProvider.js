import { createContext, useContext, useState } from "react";
import axios from "axios";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("Day");

  const getExpense = async user => {
    const URL = `http://10.0.0.224:3000/expenses/${user}`;

    const res = await axios.get(URL);

    setExpenses(res.data.expenses);
  };

  const addExpense = async data => {
    const URL = "http://10.0.0.224:3000/add";

    const res = await axios.post(URL, data);

    return res;
  };

  const addCatagory = async data => {
    const URL = "http://10.0.0.224:3000/catagory";

    const res = await axios.post(URL, data);

    return res;
  };

  const getCategories = async user => {
    const URL = `http://10.0.0.224:3000/catagory/${user}`;

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
        mode,
        setMode,
        expenseCategory,
        setExpenseCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

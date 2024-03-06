import { createContext, useContext, useState } from "react";
import axios from "axios";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(new Date());

  const getExpense = async (user) => {
    const URL = `http://10.0.0.224:3000/expenses/${user}`;

    const res = await axios.get(URL);

    setExpenses(res.data.expenses);
  };

  const addExpense = async (data) => {
    const URL = "http://10.0.0.224:3000/add";

    const res = await axios.post(URL, data);

    return res;
  };

  const addCatagory = async (data) => {
    const URL = "http://10.0.0.224:3000/catagory";

    const res = await axios.post(URL, data);

    return res;
  };

  const getCatagories = async (user) => {
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
        getCatagories,
        setCategories,
        date,
        setDate
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";
import axios from "axios";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
        getExpense,
        addExpense
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

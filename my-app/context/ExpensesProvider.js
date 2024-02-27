import { createContext, useContext, useState } from "react";
import axios from "axios";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const getExpense = async (user) => {
    const URL = `http://10.0.0.224:3000/expenses/${user}`;

    const res = await axios.get(URL);

    return res;
  };

  return (
    <ExpensesContext.Provider
      value={{
        getExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

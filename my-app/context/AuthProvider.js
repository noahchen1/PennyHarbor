import { createContext, useState, useContext } from "react";
import axios from "axios";
import BASE_URL from "../constants/url";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const URL = `${BASE_URL}/account/${user}`;

    const res = await axios.get(URL);

    setAccounts(res.data.accounts);
  };

  const createNewAcct = async (data) => {
    const URL = `${BASE_URL}/account`;

    const res = await axios.post(URL, data);

    setAccounts(res.data.accounts);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        createNewAcct,
        accounts,
        setAccounts,
        getAccounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

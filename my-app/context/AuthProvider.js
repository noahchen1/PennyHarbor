import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const createNewAcct = async email => {
    const URL = `${BASE_URL}/account`;

    const res = await axios.post(URL, { email: email });

    setAccounts(res.data.accounts);
  };

  return <AuthContext.Provider value={{ user, setUser, createNewAcct, accounts, setAccounts }}>{children}</AuthContext.Provider>;
};

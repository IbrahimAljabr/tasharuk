import { createContext, useContext, useMemo, useState } from "react";

export const UserContext = createContext();

UserContext.displayName = "UserContext";

function User({ children }) {
  const [schoolData, setSchoolData] = useState({});
  const [history, setHistory] = useState([]);

  const value = useMemo(
    () => ({ setSchoolData, schoolData, history, setHistory }),
    [setSchoolData, schoolData, history, setHistory]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useSchool = () => useContext(UserContext);

export default User;

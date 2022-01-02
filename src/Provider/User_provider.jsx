import React, { useState, createContext, useContext } from "react";

const userPro = createContext();
const userProUpdate = createContext();
export const useUserPro = () => {
  return [useContext(userPro), useContext(userProUpdate)];
};

export default function User_provider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <userPro.Provider value={user}>
      <userProUpdate.Provider value={handleLogin}>
        {children}
      </userProUpdate.Provider>
    </userPro.Provider>
  );
}

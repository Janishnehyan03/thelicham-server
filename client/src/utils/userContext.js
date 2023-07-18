"use client";

import { createContext, useContext, useState } from "react";
import Axios from "./Axios";
import { getCookie } from "cookies-next";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let token = getCookie("login_token");
  async function getMe() {
    try {
      let res = await Axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser, getMe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

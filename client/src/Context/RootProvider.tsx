"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import constants from "../constants";
import toast from "react-hot-toast";

export type AuthType = {
  _id: string;
  // avatar?: string;
  imageUrl: string;
  name: string;
  // firstName: string;
  // lastName: string;
  fullName: string;
  email: string;
  role: string;
} | null;

export const RootContext = createContext<{
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
  clearAuth: () => void;
  setAccessToken: (_t: string) => void;
  updateAuth: (data: AuthType) => void;
}>({
  auth: null,
  setAuth: () => {},
  clearAuth: () => {},
  setAccessToken: () => {},
  updateAuth: () => {},
});

type RootProviderProps = {
  children: React.ReactNode;
};
export const RootProvider = ({ children }: RootProviderProps) => {
  const [auth, setAuth] = useState<AuthType>(null);
  const [isReady, setReady] = useState(false);

  const initAuth = async () => {
    const token = localStorage.getItem(constants.LOCAL_STORAGE_KEY.accessKey);
    const userStrings = localStorage.getItem(constants.LOCAL_STORAGE_KEY.user);

    const user = userStrings && JSON.parse(userStrings);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setAuth(user);
    setReady(true);
  };

  const updateAuth = (data: AuthType) => {
    const updatedData = { ...auth, ...data } as AuthType;
    setAuth(updatedData);
    localStorage.setItem(
      constants.LOCAL_STORAGE_KEY.user,
      JSON.stringify(updatedData)
    );
  };

  useEffect(() => {
    initAuth();
  }, []);

  const clearAuth = () => {
    setAuth(null);
    toast.success("Logged out successfully");
  };

  const setAccessToken = (token: string) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem(constants.LOCAL_STORAGE_KEY.accessKey, token);
  };

  return (
    <RootContext.Provider
      value={{
        auth,
        setAuth,
        clearAuth,
        setAccessToken,
        updateAuth,
      }}
    >
      {isReady ? children : null}
    </RootContext.Provider>
  );
};

export const useRoot = () => useContext(RootContext);

export default RootProvider;

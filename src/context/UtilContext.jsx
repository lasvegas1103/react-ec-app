import { createContext, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const UtilContext = createContext();

export const useUtilContext = () => {
  return useContext(UtilContext);
};

export const UtilProvider = ({ children }) => {
  const value = {
    toast,
    ToastContainer,
  };

  return <UtilContext.Provider value={value}>{children}</UtilContext.Provider>;
};

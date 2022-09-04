import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const UtilContext = createContext();
const MyProfileFormContext = createContext();

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

/**
 * マイプロフィールのフォームでuseContext
 *
 */
export const useMyProfileFormContext = () => {
  return useContext(MyProfileFormContext);
};

export const MyProfileFormProvider = ({ children }) => {
  // フォームの名前をuseContext渡す
  const formNames = {
    userName: "userName",
    mailAddress: "mailAddres",
    password: "password",
  };

  return (
    <MyProfileFormContext.Provider value={formNames}>
      {children}
    </MyProfileFormContext.Provider>
  );
};

import React from "react";
import { useQueryClient } from "react-query";
import useQueryAuth from "../../hooks/useQueryAuth";

const Auth = ({ children }) => {
  const queryClient = useQueryClient();
  const { fetchUserData } = useQueryAuth();

  let loginData = {};
  if (fetchUserData.status === "success")
    loginData = queryClient.getQueryData("loginData");

  if (!loginData.isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;

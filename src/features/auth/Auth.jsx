import React from "react";
import { useQueryClient } from "react-query";
import { useAuthStateQuery } from "../../hooks/authHooks";

const Auth = ({ children }) => {
  const queryClient = useQueryClient();
  const { fetchUserData } = useAuthStateQuery();

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

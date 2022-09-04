import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useAuthStateQuery } from "../../hooks/authHooks";

const Auth = ({ children }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { getAuthState } = useAuthStateQuery();

  let loginData = {};
  if (!getAuthState.isLoading)
    loginData = queryClient.getQueryData("loginData");

  if (getAuthState.isLoading) {
    return <div></div>;
  }

  if (!loginData.isSignedIn) {
    // 未ログインの場合、ログイン画面に遷移させる
    history.push("/signin");
  } else {
    return children;
  }
  return <></>;
};

export default Auth;

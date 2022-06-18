import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useAuthStateQuery } from "../../hooks/authHooks";

const Auth = ({ children }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { fetchUserData } = useAuthStateQuery();

  let loginData = {};
  if (fetchUserData.status === "success")
    loginData = queryClient.getQueryData("loginData");

  if (fetchUserData.isLoading) {
    return <div>ログイン中…</div>;
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

import { useHistory } from "react-router-dom";
import { auth } from "../firebase/index";
import useQueryWrapper from "./common/useQueryWrapper";
import { CacheName } from "../config/constants";

/**
 * ユーザーのログイン状態取得
 */
export const useAuthStateQuery = () => {
  const history = useHistory();
  const fetchUserData = useQueryWrapper({
    queryKey: CacheName.LOGINDATA,
    deps: [],
    func: () => getUserDataAction(),
    options: {},
    errText: "ログイン情報取得に失敗しました",
  });

  // ユーザーデータ取得
  const getUserDataAction = async () => {
    let authState = await getAuthState();
    return authState;
  };

  // firebaseからログイン状態を取得
  const getAuthState = async () => {
    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          let loginData = {
            isSignedIn: true,
            uid: user.uid,
          };
          resolve(loginData);
        } else {
          history.push("/signin");
        }
      });
    });
  };

  return { fetchUserData };
};

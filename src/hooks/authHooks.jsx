import { useHistory } from "react-router-dom";
import { auth } from "../firebase/index";
import useQueryWrapper from "./common/useQueryWrapper";
import { CacheName } from "../config/constants";

/**
 * ユーザーのログイン状態取得
 */
export const useAuthStateQuery = () => {
  const history = useHistory();
  const getAuthState = useQueryWrapper({
    queryKey: CacheName.LOGINDATA,
    deps: [],
    func: () => getAuthStateAction(),
    options: {},
  });

  // firebaseからログイン状態を取得
  const getAuthStateAction = () => {
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

  return { getAuthState };
};

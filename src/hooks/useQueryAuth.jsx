import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase/index";

const useQueryAuth = () => {
  const history = useHistory();

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

  // ユーザーデータ取得
  const getUserDataAction = async () => {
    let authState = await getAuthState();
    return authState;
  };

  // ログイン状態をキャッシュする。Infinityにして明示的に削除する必要あり。
  const fetchUserData = useQuery("loginData", getUserDataAction, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return { fetchUserData };
};

export default useQueryAuth;

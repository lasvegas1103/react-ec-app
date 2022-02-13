import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { auth, db, FirebaseTimeStamp } from "../firebase/index";

const useMutationUserData = () => {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState();
  const [snackStatus, setSnackStatus] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  // ユーザーデータ登録（会員登録）
  const signupAction = (props) => {
    auth
      .createUserWithEmailAndPassword(props.loginId, props.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimeStamp.now();

          let userInitialData = {
            uid: uid,
            username: props.username,
            loginId: props.loginId,
            role: "customer",
            created_at: timestamp,
            update_at: timestamp,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              setUserData(userInitialData);
              setIsSuccess(true);
            })
            .catch((error) => {
              auth.currentUser.delete().then(() => {
                console.log(error.code);
                console.log(error.message);
              });
              setSnackStatus({
                open: true,
                type: "error",
                message: "ログインに失敗しました。",
              });
            });
        }
      })
      .catch((error) => {
        setSnackStatus({
          open: true,
          type: "error",
          message: "ログインに失敗しました。",
        });
        console.log(error);
        console.log(error.message);
      });
    return { userData, snackStatus, isSuccess };
  };

  // サインイン
  const signinAction = (props) => {
    auth
      .signInWithEmailAndPassword(props.loginId, props.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;

          db.collection("users")
            .doc(uid)
            .get()
            .then((userData) => {
              let data = userData.data();
              setUserData(data);
              setIsSuccess(true);
            });
        } else {
          throw new Error("DB取得で失敗");
        }
      })
      .catch((error) => {
        setSnackStatus({
          open: true,
          type: "error",
          message: "ログインに失敗しました。",
        });
        console.log(error);
        console.log(error.message);
      });

    return { userData, snackStatus, isSuccess };
  };

  // useMutationを使ってユーザーデータ登録・セット
  const signup = useMutation((props) => signupAction(props), {
    onSuccess: (res) => {
      if (res.isSuccess) queryClient.setQueryData("userData", res.userData);
    },
  });

  // サインイン処理
  const signin = useMutation((props) => signinAction(props), {
    onSuccess: (res) => {
      if (res.isSuccess) queryClient.setQueryData("userData", res.userData);
    },
  });

  return { signup, signin };
};

export default useMutationUserData;

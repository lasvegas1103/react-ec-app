import { useState } from "react";
import { useQueryClient } from "react-query";
import { auth, db, FirebaseTimeStamp } from "../firebase/index";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import useMutationWrapper from "./useMutationWrapper";
import { CacheName } from "../config/constants";

const useMutationUserData = () => {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState();
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
                throw new Error("ユーザーデータの登録に失敗しました");
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        throw new Error("ユーザーデータの登録に失敗しました");
      });
    return { userData, isSuccess };
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
        console.log(error);
        console.log(error.message);
        throw new Error("DB取得で失敗");
      });

    return { userData, isSuccess };
  };

  // カートに入れる詳細
  const addCartAction = (addCartData) => {
    let isSuccess = false;

    // userCartに登録
    const userCartRef = collection(db, "users", addCartData.uid, "userCart");
    setDoc(doc(userCartRef), addCartData);
    isSuccess = true;

    return { isSuccess, addCartData };
  };

  //お気に入りに追加詳細
  const addFavoriteAction = async (addFavoriteData) => {
    let isSuccess = false;
    console.log(addFavoriteData);
    // userFavoriteに登録
    const UserFavoriteRef = doc(
      db,
      "users",
      addFavoriteData.uid,
      "userFavorite",
      addFavoriteData.productId
    );
    const docSnap = await getDoc(UserFavoriteRef);

    if (docSnap.exists()) {
      // すでにデータが存在する場合、sizeTypeだけ追加
      await updateDoc(UserFavoriteRef, {
        sizType: arrayUnion(addFavoriteData.sizeType),
      });
    } else {
      await setDoc(UserFavoriteRef, addFavoriteData);
    }

    isSuccess = true;
    return { isSuccess, addFavoriteData };
  };

  //////////////////////////////////////////////////////////

  // useMutationを使ってユーザーデータ登録・セット
  const signup = useMutationWrapper({
    func: (data) => signupAction(data),
    options: {
      onSuccess: (res) => {
        if (res.isSuccess)
          queryClient.setQueryData(CacheName.USERDATA, res.userData);
      },
    },
  });

  // サインイン処理
  const signin = useMutationWrapper({
    func: (data) => signinAction(data),
    options: {
      onSuccess: (res) => {
        if (res.isSuccess)
          queryClient.setQueryData(CacheName.USERDATA, res.userData);
      },
    },
  });

  // カートに入れる
  const addCart = useMutationWrapper({
    func: (addCartData) => addCartAction(addCartData),
    options: {
      onMutate: async () => {
        await queryClient.cancelQueries(CacheName.USERCARTCNT);

        const previousValue = queryClient.getQueryData(CacheName.USERCARTCNT);
        queryClient.setQueryData(CacheName.USERCARTCNT, (old) =>
          old !== undefined ? ++old : 1
        );

        return previousValue !== undefined ? previousValue : 0;
      },
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData(CacheName.USERCARTCNT, previousValue),
      onSettled: () => queryClient.invalidateQueries(CacheName.USERCARTCNT),
    },
    errText: "カートに入れる処理に失敗しました",
  });

  // お気に入りに追加
  const addFavorite = useMutationWrapper({
    func: (addFavoriteData) => addFavoriteAction(addFavoriteData),
    options: {
      onMutate: async () => {
        await queryClient.cancelQueries(CacheName.USERFAVORITECNT);

        const previousValue = queryClient.getQueryData(
          CacheName.USERFAVORITECNT
        );
        queryClient.setQueryData(CacheName.USERFAVORITECNT, (old) =>
          old !== undefined ? ++old : 1
        );

        return previousValue !== undefined ? previousValue : 0;
      },
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData(CacheName.USERCARTCNT, previousValue),
      onSettled: () => queryClient.invalidateQueries(CacheName.USERCARTCNT),
    },
    errText: "お気に入りに追加に失敗しました",
  });

  return { signup, signin, addCart, addFavorite };
};

export default useMutationUserData;

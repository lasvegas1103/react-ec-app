import { useQueryClient } from "react-query";
import { auth, db, FirebaseTimeStamp } from "../firebase/index";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  query,
  where,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import useMutationWrapper from "./common/useMutationWrapper";
import { CacheName } from "../config/constants";

/**
 * 会員登録
 */
export const useSignUp = () => {
  const queryClient = useQueryClient();

  // useMutationを使ってユーザーデータ登録・セット
  const signup = useMutationWrapper({
    func: (data) => signupAction(data),
    options: {
      onSuccess: (res) => {
        queryClient.setQueryData(CacheName.USERDATA, res.userData);
      },
    },
  });

  // ユーザーデータ登録（会員登録）
  const signupAction = (props) => {
    return new Promise((resolve, reject) => {
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
                resolve(userInitialData);
              })
              .catch((error) => {
                auth.currentUser.delete().then(() => {
                  console.log(error);
                  reject(
                    "会員登録に失敗しました。再度会員登録をしてください。"
                  );
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          reject("会員登録に失敗しました。再度会員登録をしてください。");
        });
    });
  };

  return { signup };
};

/**
 * ログイン
 */
export const useSignIn = () => {
  const queryClient = useQueryClient();

  // ログイン処理
  const signin = useMutationWrapper({
    func: (data) => signinAction(data),
    options: {
      onSuccess: (res) => {
        if (res.isSuccess)
          queryClient.setQueryData(CacheName.USERDATA, res.userData);
      },
    },
  });

  // サインイン
  const signinAction = (props) => {
    return new Promise((resolve, reject) => {
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
                resolve(userData.data());
              });
          } else {
            reject("ログインに失敗しました。再度ログインしてください。");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
          reject("ログインに失敗しました。再度ログインしてください。");
        });
    });
  };

  return { signin };
};

/**
 * カートに追加
 */
export const useAddCart = () => {
  const queryClient = useQueryClient();

  // useMutationを使ってカートに追加
  const addCart = useMutationWrapper({
    func: (addCartData) => addCartAction(addCartData),
    options: {
      onSuccess: () => {
        queryClient.setQueryData(CacheName.USERCARTCNT, (old) =>
          old !== undefined ? ++old : 1
        );
      },
      onError: () => {
        queryClient.invalidateQueries(CacheName.USERCARTCNT);
      },
      onSettled: () => {
        queryClient.invalidateQueries(CacheName.USERCARTCNT);
        queryClient.invalidateQueries(CacheName.USERCARTLIST);
      },
    },
    errText: "カートに入れる処理に失敗しました",
  });

  // カートに追加詳細
  const addCartAction = async (addCartData) => {
    // userCartに登録
    const userCartRef = collection(db, "users", addCartData.uid, "userCart");
    await setDoc(doc(userCartRef), addCartData);
    return;
  };

  return { addCart };
};

/**
 * お気に入りに追加
 */
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

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

  //お気に入りに追加詳細
  const addFavoriteAction = async (addFavoriteData) => {
    try {
      // userFavoriteに登録
      const UserFavoriteRef = collection(
        db,
        "users",
        addFavoriteData.uid,
        "userFavorite"
      );

      // 追加
      await addDoc(UserFavoriteRef, addFavoriteData);
    } catch (e) {
      throw new Error("お気に入り追加に失敗しました。");
    }
    return { addFavoriteData };
  };

  return { addFavorite };
};

/**
 * お気に入りから削除
 */
export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  // お気に入りから削除
  const deleteFavorite = useMutationWrapper({
    func: (deleteFavoriteData) => deleteFavoriteAction(deleteFavoriteData),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(CacheName.USERFAVORITECNT);
      },
      onError: (err, variables, previousValue) =>
        queryClient.invalidateQueries(CacheName.USERFAVORITECNT),
      onSettled: () => {
        queryClient.invalidateQueries(CacheName.USERFAVORITECNT);
        queryClient.invalidateQueries(CacheName.FAVORITELIST);
      },
    },
    errText: "お気に入りから削除に失敗しました",
  });

  //お気に入りから削除
  const deleteFavoriteAction = async (deleteFavoriteData) => {
    // users/userFavoriteから削除
    const deleteUserFavoriteQuery = query(
      collection(db, "users", deleteFavoriteData.uid, "userFavorite"),
      where("productId", "==", deleteFavoriteData.productId)
    );

    // バッチ処理
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(deleteUserFavoriteQuery);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return;
  };

  return { deleteFavorite };
};

/**
 * カートから商品を削除
 */
export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  // カートから商品削除
  const deleteCart = useMutationWrapper({
    func: (deleteCartData) => deleteCartAction(deleteCartData),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(CacheName.USERCARTCNT);
      },
      onError: (err, variables, previousValue) =>
        queryClient.invalidateQueries(CacheName.USERCARTCNT),
      onSettled: () => {
        queryClient.invalidateQueries(CacheName.USERCARTCNT);
        queryClient.invalidateQueries(CacheName.USERCARTLIST);
      },
    },
    errText: "カートから削除に失敗しました",
  });

  //カートから削除
  const deleteCartAction = async (deleteCartData) => {
    // users/userCartから削除
    const deleteUserCartQuery = query(
      collection(db, "users", deleteCartData.uid, "userCart"),
      where("productId", "==", deleteCartData.productId),
      where("sizeType", "==", deleteCartData.sizeType)
    );

    // バッチ処理
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(deleteUserCartQuery);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return;
  };

  return { deleteCart };
};

// 既読に更新してお気に入りアイコンの件数を減らす
export const useUpdataUnRead = () => {
  const queryClient = useQueryClient();
  const updataUnRead = useMutationWrapper({
    func: (removeFavoritedata) => updataUnReadAction(removeFavoritedata),
    options: {
      onSuccess: () => {
        // お気に入り件数更新
        queryClient.invalidateQueries(CacheName.USERFAVORITECNT);
      },
    },
    errText: "更新に失敗しました",
  });

  const updataUnReadAction = async (removeFavoritedata) => {
    // 既読に更新
    const userFavoriteQuery = query(
      collection(db, "users", removeFavoritedata.uid, "userFavorite"),
      where("productId", "==", removeFavoritedata.productId)
    );

    // バッチ処理
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(userFavoriteQuery);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { unRead: false });
    });
    await batch.commit();
  };

  return { updataUnRead };
};

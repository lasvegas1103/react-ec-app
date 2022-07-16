import { db } from "../firebase/index";
import {
  getDoc,
  getDocs,
  query,
  doc,
  collection,
  where,
} from "firebase/firestore";
import useQueryWrapper from "./common/useQueryWrapper";
import { CacheName } from "../config/constants";

/**
 * 商品詳細画面でお気に入り情報取得
 */
export const useUserFavQuery = (props) => {
  const getUserFavorite = useQueryWrapper({
    queryKey: CacheName.USERFAVORITE,
    deps: [props.productId],
    func: () => getUserFavoriteAction(props),
    options: {
      staleTime: 0,
      cacheTime: 10 * 1000,
    },
    errText: "お気に入り情報の取得に失敗しました",
  });

  const getUserFavoriteAction = async (props) => {
    // const userFavoriteRef = doc(
    //   db,
    //   "users",
    //   props.uid,
    //   "userFavorite",
    //   props.productId
    // );
    // 対象商品に対してお気に入りしていたらデータ取得
    const q = query(
      collection(db, "users", props.uid, "userFavorite"),
      where("productId", "==", props.productId)
    );
    let favData = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      favData.push(doc.data());
    });
    return favData;
    // if (docSnap.exists()) {
    //   return docSnap.data();
    // } else {
    //   return;
    // }
  };

  return { getUserFavorite };
};

/**
 * グロナビのお気に入り件数取得
 */
export const useUserFavCntQuery = (props) => {
  const getUserFavoriteCnt = useQueryWrapper({
    queryKey: CacheName.USERFAVORITECNT,
    deps: [],
    func: () => getUserFavoriteCntAction(props),
    options: {},
    errText: "",
  });

  const getUserFavoriteCntAction = async (props) => {
    const querySnapshot = await getDocs(
      collection(db, "users", props.uid, "userFavorite")
    );
    let favCnt = 0;
    querySnapshot.forEach((doc) => {
      favCnt++;
    });
    return favCnt;
  };

  return { getUserFavoriteCnt };
};

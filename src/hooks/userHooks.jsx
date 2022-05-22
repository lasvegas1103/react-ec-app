import { db } from "../firebase/index";
import { getDoc, getDocs, query, doc, collection } from "firebase/firestore";
import useQueryWrapper from "./useQueryWrapper";
import { CacheName } from "../config/constants";

/* 商品詳細画面でお気に入り情報取得 */
export const useUserFav = (props) => {
  const getUserFavorite = useQueryWrapper({
    queryKey: CacheName.USERFAVORITE,
    deps: [],
    func: () => getUserFavoriteAction(props),
    options: {},
    errText: "お気に入り情報の取得に失敗しました",
  });

  const getUserFavoriteAction = async (props) => {
    const userFavoriteRef = doc(
      db,
      "users",
      props.uid,
      "userFavorite",
      props.productId
    );
    const docSnap = await getDoc(userFavoriteRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("お気に入り情報の取得に失敗しました");
    }
  };

  return { getUserFavorite };
};

///////////////////////////////////////////////////////////////
/* グロナビのお気に入り件数取得 */
export const useUserFavCnt = (props) => {
  const getUserFavoriteCnt = useQueryWrapper({
    queryKey: CacheName.USERFAVORITECNT,
    deps: [],
    func: () => getUserFavoriteCntAction(props),
    options: {},
    errText: "お気に入り情報の取得に失敗しました",
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

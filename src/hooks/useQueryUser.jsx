import { db } from "../firebase/index";
import { getDoc, doc } from "firebase/firestore";
import useQueryWrapper from "./useQueryWrapper";
import { CacheName } from "../config/constants";

/* ユーザーの必要な情報を取得 */
const useQueryUser = (props) => {
  // 商品詳細画面でお気に入り情報取得
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

  // グロナビのお気に入り件数取得
  const getUserFavoriteCntAction = async (props) => {
    const userFavoriteRef = doc(db, "users", props.uid, "userFavorite");
    const docSnap = await getDoc(userFavoriteRef);
    console.log("ggggg");
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("グロナビのお気に入り件数取得に失敗しました");
    }
  };

  ///////////////////////////////////////////////////////////////

  const getUserFavorite = useQueryWrapper({
    queryKey: CacheName.USERFAVORITE,
    deps: [],
    func: () => getUserFavoriteAction(props),
    options: { staleTime: 1000 * 60 },
    errText: "お気に入り情報の取得に失敗しました",
  });

  // グロナビのお気に入り件数取得
  const getUserFavoriteCnt = useQueryWrapper({
    queryKey: CacheName.USERFAVORITECNT,
    deps: [],
    func: () => getUserFavoriteCntAction(props),
    options: { staleTime: 1000 * 60 },
    errText: "お気に入り情報の取得に失敗しました",
  });

  return { getUserFavorite, getUserFavoriteCnt };
};

export default useQueryUser;

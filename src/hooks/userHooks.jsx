import { db } from "../firebase/index";
import { getDocs, query, collection, where } from "firebase/firestore";
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
  };

  return { getUserFavorite };
};

/**
 * 商品詳細画面でカート情報取得
 */
export const useUserCartQuery = (props) => {
  const getUserCart = useQueryWrapper({
    queryKey: CacheName.USERCART,
    deps: [props.productId],
    func: () => getUserCartAction(props),
    options: {
      staleTime: 0,
      cacheTime: 10 * 1000,
    },
    errText: "カート情報の取得に失敗しました",
  });

  const getUserCartAction = async (props) => {
    // 対象商品に対してお気に入りしていたらデータ取得
    const q = query(
      collection(db, "users", props.uid, "userCart"),
      where("productId", "==", props.productId)
    );
    let cartData = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cartData.push(doc.data());
    });
    return cartData;
  };

  return { getUserCart };
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
    const q = query(
      collection(db, "users", props.uid, "userFavorite"),
      where("unRead", "==", true)
    );
    const querySnapshot = await getDocs(q);
    let favCnt = 0;
    querySnapshot.forEach((doc) => {
      favCnt++;
    });
    return favCnt;
  };

  return { getUserFavoriteCnt };
};

/**
 * カートの件数取得
 */
export const useUserCartCntQuery = (props) => {
  const getUserCartCnt = useQueryWrapper({
    queryKey: CacheName.USERCARTCNT,
    deps: [],
    func: () => getUserCartCntAction(props),
    options: {},
    errText: "",
  });

  const getUserCartCntAction = async (props) => {
    const q = query(collection(db, "users", props.uid, "userCart"));
    const querySnapshot = await getDocs(q);
    let CartCnt = 0;
    querySnapshot.forEach((doc) => {
      CartCnt++;
    });
    return CartCnt;
  };

  return { getUserCartCnt };
};

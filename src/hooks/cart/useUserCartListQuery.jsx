import { db } from "../../firebase/index";
import { getDocs, query, collection } from "firebase/firestore";
import useQueryWrapper from "../common/useQueryWrapper";
import { CacheName } from "../../config/constants";

/**
 * カート詳細画面でカートリスト取得
 */
export const useUserCartListQuery = (props) => {
  const getUserCartList = useQueryWrapper({
    queryKey: CacheName.USERCARTLIST,
    deps: [],
    func: () => getUserCartListAction(props),
    options: {},
    errText: "カート情報の取得に失敗しました",
  });

  const getUserCartListAction = async (props) => {
    // 対象商品に対してお気に入りしていたらデータ取得
    const q = query(collection(db, "users", props.uid, "userCart"));
    const cartData = [];
    const querySnapshot = await getDocs(q);

    // "userCart"が取得できないときは、ここでリターン
    if (querySnapshot.empty) {
      return { cartData };
    }

    querySnapshot.forEach((doc) => {
      cartData.push(doc.data());
    });
    return cartData;
  };

  return { getUserCartList };
};

import { db } from "../firebase/index";
import { doc, getDoc } from "firebase/firestore";
import useQueryWrapper from "./useQueryWrapper";
import { useUtilContext } from "../context/UtilContext";
import { CacheName } from "../config/constants";

/* ユーザーの必要な情報を取得 */
const useQueryUser = (props) => {
  const { toast } = useUtilContext();

  // 商品詳細画面でお気に入り情報取得
  const getUserFavoriteAction = async (productId) => {
    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      toast.error("商品情報を取得できませんでした");
      throw new Error("商品情報を取得できませんでした");
    }
  };

  const getUserFavorite = useQueryWrapper({
    queryKey: CacheName.USERFAVORITE,
    deps: [],
    func: () => getUserFavoriteAction(props.productId),
    options: { staleTime: 1000 * 60 },
  });

  return { getUserFavorite };
};

export default useQueryUser;

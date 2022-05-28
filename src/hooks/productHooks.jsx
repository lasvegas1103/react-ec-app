import { db } from "../firebase/index";
import { doc, getDoc } from "firebase/firestore";
import useQueryWrapper from "./common/useQueryWrapper";
import { CacheName } from "../config/constants";

/**
 * 商品詳細画面で必要な情報を取得
 */
export const useProductQuery = (productId) => {
  const fetchProductDetail = useQueryWrapper({
    queryKey: CacheName.PRODUCTDETAIL,
    deps: [],
    func: () => getProductDetail(productId),
    options: {},
    errText: "商品情報を取得できませんでした",
  });

  const getProductDetail = async (productId) => {
    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("商品情報を取得できませんでした");
    }
  };

  return { fetchProductDetail };
};

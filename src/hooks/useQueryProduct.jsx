import { db } from "../firebase/index";
import { doc, getDoc } from "firebase/firestore";
import useQueryWrapper from "./useQueryWrapper";
import { useUtilContext } from "../context/UtilContext";

/* 商品詳細画面で必要な情報を取得 */
const useQueryProduct = (props) => {
  const { toast } = useUtilContext();
  const getProductDetail = async (docId) => {
    const productRef = doc(db, "products", docId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      toast.error("商品情報を取得できませんでした");
      throw new Error("商品情報を取得できませんでした");
    }
  };

  const fetchProductDetail = useQueryWrapper({
    queryKey: "productDetail",
    deps: [],
    func: () => getProductDetail(props.id),
    options: { staleTime: 1000 * 60 },
  });

  return { fetchProductDetail };
};

export default useQueryProduct;

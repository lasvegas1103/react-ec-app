import { useQueryClient } from "react-query";
import { db } from "../../firebase/index";
import {
  collection,
  query,
  where,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import useMutationWrapper from "../common/useMutationWrapper";
import { CacheName } from "../../config/constants";

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

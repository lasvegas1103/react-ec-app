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
 *
 * @returns カートの商品情報を更新
 */
export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  // カートの商品情報更新
  const updateCart = useMutationWrapper({
    func: (updateCartData) => updateCartAction(updateCartData),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(CacheName.USERCARTLIST);
      },
      onError: (data) => {
        console.log(data);
        queryClient.invalidateQueries(CacheName.USERCARTLIST);
      },
    },
    errText: "カートの更新に失敗しました",
  });

  //カートの更新
  const updateCartAction = async (updateCartData) => {
    try {
      // users/userCartから削除
      const updateUserCartQuery = query(
        collection(db, "users", updateCartData.uid, "userCart"),
        where("productId", "==", updateCartData.productId),
        where("sizeType", "==", updateCartData.sizeType)
      );

      // バッチ処理
      const batch = writeBatch(db);
      const querySnapshot = await getDocs(updateUserCartQuery);
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, {
          quantity: updateCartData.quantity,
        });
      });
      await batch.commit();
    } catch (error) {
      throw new Error(error);
    }
  };

  return { updateCart };
};

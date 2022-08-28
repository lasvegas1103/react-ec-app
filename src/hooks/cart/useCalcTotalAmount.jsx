import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";

/**
 *　商品の合計金額を計算
 * @returns
 */
const useCalcTotalAmount = () => {
  const queryClient = useQueryClient();
  const [totalAmount, setTotalAmount] = useState(0);
  // カートに追加された商品情報を取得
  const productDataList = queryClient.getQueryData("userCartList");
  // 合計金額計算
  const calcTotalAmount = useCallback(() => {
    let totalAmount = 0;
    // 商品が追加されていない場合、0円で返す
    if (!productDataList || productDataList?.cartData?.length === 0) {
      setTotalAmount(totalAmount);
      return;
    }

    productDataList.forEach((data) => {
      totalAmount += parseInt(data.quantity) * parseInt(data.price);
    });
    setTotalAmount(totalAmount);
  }, [productDataList]);

  return { totalAmount, calcTotalAmount };
};

export default useCalcTotalAmount;

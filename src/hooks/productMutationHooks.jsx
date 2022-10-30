import { useState } from "react";
import { useQueryClient } from "react-query";
import useMutationWrapper from "./common/useMutationWrapper";
import { db, FirebaseTimeStamp } from "../firebase/index";
import { CacheName } from "../config/constants";

/**
 * 商品情報登録
 */
export const useSaveProduct = () => {
  const queryClient = useQueryClient();
  const [productData, setProductData] = useState([]);
  const productsRef = db.collection("products");

  // useMutationを使って商品情報を登録
  const saveProduct = useMutationWrapper({
    func: (data) => saveProductAction(data),
    options: {
      onSuccess: (res) => {
        queryClient.setQueryData(CacheName.PRODUCTDATA, res.productData);
      },
    },
  });

  // firestoreに登録
  const saveProductAction = async (props) => {
    const timestamp = FirebaseTimeStamp.now();
    const data = {
      id: productsRef.doc().id,
      title: props.title,
      description: props.description,
      category: props.category,
      sex: props.sex,
      price: props.price,
      sizes: props.sizes,
      images: props.images,
      update_at: timestamp,
    };

    // 登録
    productsRef
      .doc(data.id)
      .set(data, { merge: true })
      .then(() => {
        setProductData(productData);
      })
      .catch((error) => {
        throw new Error(error);
      });

    return "登録完了！";
  };

  return { saveProduct };
};

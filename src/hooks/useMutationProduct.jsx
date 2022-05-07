import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { db, FirebaseTimeStamp } from "../firebase/index";
import { CacheName } from "../config/constants";

const useMutationProduct = () => {
  const queryClient = useQueryClient();
  const [productData, setProductData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const productsRef = db.collection("products");

  // 商品の登録
  const saveProductAction = (props) => {
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
        setIsSuccess(true);
        setProductData(productData);
      })
      .catch((error) => {
        throw new Error(error);
      });

    return { productData, isSuccess };
  };

  const saveProduct = useMutation((props) => saveProductAction(props), {
    onSuccess: (res) => {
      if (res.isSuccess)
        // 必要？？
        queryClient.setQueryDate(CacheName.PRODUCTDATA, res.productData);
    },
  });

  return { saveProduct };
};

export default useMutationProduct;

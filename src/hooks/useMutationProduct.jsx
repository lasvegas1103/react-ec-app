import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { auth, db, FirebaseTimeStamp } from "../firebase/index";

const useMutationProduct = () => {
  const queryClient = useQueryClient();
  const [productData, setProductData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const productsRef = db.collection("product");

  const saveProductAction = (props) => {
    const timestamp = FirebaseTimeStamp.now();
    console.log("fff");
    console.log(props);
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
        queryClient.setQueryDate("productData", res.productData);
    },
  });

  return { saveProduct };
};

export default useMutationProduct;

import { useInfiniteQuery } from "react-query";
import { db } from "../firebase/index";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";

const useInfiniteQueryProductList = () => {
  const getProductList = async (props) => {
    console.log(props.pageParam);
    const productRef = query(
      collection(db, "products"),
      orderBy("update_at"),
      startAfter(props.pageParam),
      limit("2")
    );
    const docSnapShot = await getDocs(productRef);
    // クエリカーソルに使用
    const lastVisible = docSnapShot.docs[docSnapShot.docs.length - 1];

    let productData = [];
    docSnapShot.forEach((doc) => {
      productData.push(doc.data());
    });

    return { productData, lastVisible };
  };

  const getProductListAction = ({ pageParam = 0 }) => {
    const { productData, lastVisible } = getProductList({ pageParam });

    return { productData, nextPage: lastVisible };
  };

  const { data } = useInfiniteQuery("productList", getProductListAction, {
    getNextPageParam: (lastPage, page) => {
      // if(lastPage.)
    },
  });

  return { data };
};

export default useInfiniteQueryProductList;

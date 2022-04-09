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
    const productRef = query(
      collection(db, "products"),
      orderBy("update_at"),
      startAfter(props.pageParam),
      limit("9")
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

  const getProductListAction = async ({ pageParam = 0 }) => {
    const { productData, lastVisible } = await getProductList({ pageParam });

    return { productData, nextPage: lastVisible };
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery("productList", getProductListAction, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  });

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};

export default useInfiniteQueryProductList;

import { useInfiniteQuery } from "react-query";
import { db } from "../firebase/index";
import { CacheName } from "../config/constants";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";

/**
 * 商品一覧で表示する商品を取得
 * @returns
 */
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
  } = useInfiniteQuery(CacheName.PRODUCTLIST, getProductListAction, {
    staleTime: 0,
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

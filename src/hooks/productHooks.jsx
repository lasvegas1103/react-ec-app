import { db } from "../firebase/index";
import useInfiniteQueryWrapper from "./common/useInfiniteQueryWrapper";
import useQueryWrapper from "./common/useQueryWrapper";
import { CacheName } from "../config/constants";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

/**
 * 商品詳細画面で必要な情報を取得
 */
export const useProductQuery = (productId) => {
  const fetchProductDetail = useQueryWrapper({
    queryKey: CacheName.PRODUCTDETAIL,
    deps: [],
    func: () => getProductDetail(productId),
    options: {},
    errText: "商品情報を取得できませんでした",
  });

  const getProductDetail = async (productId) => {
    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("商品情報を取得できませんでした");
    }
  };

  return { fetchProductDetail };
};

/**
 * お気に入り詳細画面表示
 */
export const useInfiniteProductListByFavQuery = () => {
  // useInfiniteQueryを使って商品情報を登録
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQueryWrapper({
    queryKey: CacheName.FAVORITELIST,
    deps: [],
    func: (data) => getProductListAction(data),
    options: {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage ?? undefined;
      },
    },
    errText: "商品情報を取得できませんでした",
  });

  const getProductListAction = async ({ pageParam = 0 }) => {
    const { productData, lastVisible } = await getProductList({ pageParam });

    return { productData, nextPage: lastVisible };
  };

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

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};

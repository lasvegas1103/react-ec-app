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
  where,
} from "firebase/firestore";

/**
 * 商品詳細画面で必要な情報を取得
 */
export const useProductQuery = (productId) => {
  const fetchProductDetail = useQueryWrapper({
    queryKey: CacheName.PRODUCTDETAIL,
    deps: [productId],
    func: () => getProductDetail(productId),
    options: {
      staleTime: 0,
      cacheTime: 60 * 1000,
    },
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
export const useInfiniteProductListByFavQuery = (uid) => {
  // useInfiniteQueryを使って商品情報を取得
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
      staleTime: 0,
      cacheTime: 0,
    },
    errText: "商品情報を取得できませんでした",
  });

  const getProductListAction = async ({ pageParam = 0 }) => {
    const { productData, lastVisible } = await getProductList({ pageParam });

    return { productData, nextPage: lastVisible };
  };

  const getProductList = async (props) => {
    //　お気に入りに追加している商品IDを取得
    const userFavoriteRef = query(collection(db, "users", uid, "userFavorite"));
    const querySnapshot = await getDocs(userFavoriteRef);
    const productListOfUserfavData = [];
    const productData = [];
    let lastVisible = 0;

    // "userFavorite"が取得できないときは、ここでリターン
    if (querySnapshot.empty) {
      return { productData, lastVisible };
    }

    querySnapshot.forEach((doc) => {
      productListOfUserfavData.push(doc.data().productId);
    });

    // お気に入り詳細画面に表示する商品情報を取得
    const productRef = query(
      collection(db, "products"),
      where("id", "in", productListOfUserfavData),
      orderBy("update_at"),
      startAfter(props.pageParam),
      limit("10")
    );
    const docSnapShot = await getDocs(productRef);

    // クエリカーソルに使用
    lastVisible = docSnapShot.docs[docSnapShot.docs.length - 1];

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

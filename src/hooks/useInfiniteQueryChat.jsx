import { useInfiniteQuery } from "react-query";
import { getChatMessageList } from "../model/Chat";
import { CacheName } from "../config/constants";

/* 
*チャット無限スクロール用のカスタムフック
*
*/
const useInfiniteQueryChat = () => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
  } = useInfiniteQuery(CacheName.CHATMESSAGELIST, async ({pageParam = 0}) => {
    const res = await getChatMessageList({pageParam});
    return res;
  },
  {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    getPreviousPageParam: (prevPage) => {
      return prevPage.prevCursor ?? undefined;
    },
  }
  );

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  };
};

export default useInfiniteQueryChat;

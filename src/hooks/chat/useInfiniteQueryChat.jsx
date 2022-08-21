import { useInfiniteQuery } from "react-query";
import { getChatMessageList } from "../../model/Chat";
import { CacheName } from "../../config/constants";

/*
 *チャット無限スクロール用のカスタムフック
 *
 */
const useInfiniteQueryChat = (groupID) => {
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
  } = useInfiniteQuery(
    CacheName.CHATMESSAGELIST,
    async ({ pageParam = 0 }) => {
      const res = await getChatMessageList({ pageParam, groupID });
      return res;
    },
    {
      staleTime: 0,
      cacheTime: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage ?? undefined;
      },
      getPreviousPageParam: (prevPage) => {
        if (!prevPage.prevCursor.prevVisible) return undefined;
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

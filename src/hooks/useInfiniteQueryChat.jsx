import { useInfiniteQuery } from "react-query";
import { getChatMessageList } from "../model/chat";
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
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(CacheName.CHATMESSAGELIST, async ({pageParam = 0}) => {
    const res = await getChatMessageList(pageParam);
    return res;
  },
  {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  }
  );

  return {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};

export default useInfiniteQueryChat;

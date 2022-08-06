import { useEffect } from "react";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/useInfiniteQueryChat";


const Chat = () => {
const { isScrollPosition, judgementScrollPosition} = useScrollPosition();
const {data, isLoading, isFetchingNextPage, isFetchingPreviousPage, hasPreviousPage, fetchPreviousPage } = useInfiniteQueryChat();

useEffect(() => {
    judgementScrollPosition();

    if (isScrollPosition === "end") {
    } else if (isScrollPosition === "top") {
        console.log("ttt")
        console.log(hasPreviousPage)
        // 過去のメッセージを取得
        if (hasPreviousPage) {
            fetchPreviousPage();
        }
    }

},[isScrollPosition])

// console.log(isScrollPosition)
    return(
        <>
        {data?.pages && 
            data.pages.map(page => 
                    page.chatMessageData.map(data => (
                        <>
                        <div key={data.id}>{data.message}</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        </>
                    ))
                )
        }
        </>
    );
}

export default Chat;
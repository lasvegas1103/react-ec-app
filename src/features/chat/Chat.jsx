import { useEffect } from "react";
import { auth } from "../../firebase";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/useInfiniteQueryChat";
// import useListenChatMessage from "../../hooks/common/useListenChatMessage";

/*
 * チャット
 *
 */
const Chat = () => {
  console.log("ddd");
  const { isScrollPosition, judgementScrollPosition } = useScrollPosition();
  const { data, hasPreviousPage, fetchPreviousPage } = useInfiniteQueryChat();
  // const { listenChatMessage, unsubscribe } = useListenChatMessage();
  console.log(hasPreviousPage);
  useEffect(() => {
    // 最下部へ移動
    const elem = document.documentElement;
    const bottom = elem.scrollHeight - elem.clientHeight;
    window.scroll(0, bottom);

    // スクロール位置判定
    judgementScrollPosition();

    if (isScrollPosition === "end") {
    } else if (isScrollPosition === "top") {
      // 過去のメッセージを取得
      if (hasPreviousPage) {
        fetchPreviousPage();
      }
    }

    return () => {
      // chatのリスナーでタッチ
      // unsubscribe();
    };
  }, [
    isScrollPosition,
    fetchPreviousPage,
    hasPreviousPage,
    judgementScrollPosition,
    // unsubscribe,
  ]);

  return (
    <div className="msgs">
      {/* 初期表示のN件分表示 */}
      {data?.pages &&
        data.pages.map((page) =>
          page.chatMessageData.map((data) => (
            <div>
              <div
                key={data.id}
                className={`msg ${
                  data.userID === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                {data.message}
              </div>
            </div>
          ))
        )}
    </div>
  );
};

export default Chat;

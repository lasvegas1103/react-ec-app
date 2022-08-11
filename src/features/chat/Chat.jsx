import { useEffect, useRef } from "react";
import { auth } from "../../firebase";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/useInfiniteQueryChat";
import useListenLatestChatMessage from "../../hooks/common/useListenLatestChatMessage";

/*
 * チャット
 *
 */
const Chat = () => {
  const bottomRef = useRef(null);
  const { isScrollPosition, judgementScrollPosition } = useScrollPosition();
  const { data, hasPreviousPage, fetchPreviousPage } = useInfiniteQueryChat();
  const { addLatestChatMessage, listenLatestChatMessage } =
    useListenLatestChatMessage();

  useEffect(() => {
    // 最下部へ移動
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView(false);
    }, 500);
  }, []);

  useEffect(() => {
    // スクロール位置判定
    judgementScrollPosition();

    if (isScrollPosition === "end") {
    } else if (isScrollPosition === "top") {
      // 過去のメッセージを取得
      if (hasPreviousPage) {
        fetchPreviousPage();
      }
    }

    // 最新のchatMessageリッスン
    const unsubscribe = listenLatestChatMessage();

    return () => {
      // chatのリスナーでタッチ
      unsubscribe();
    };
  }, [
    isScrollPosition,
    fetchPreviousPage,
    hasPreviousPage,
    judgementScrollPosition,
    listenLatestChatMessage,
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
      {/* 最新のチャットメッセージリッスン */}
      {addLatestChatMessage.length > 0 &&
        addLatestChatMessage.map((data) => (
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
        ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;

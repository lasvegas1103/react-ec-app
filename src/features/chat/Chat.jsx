import { useEffect, useRef } from "react";
import { auth } from "../../firebase";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/useInfiniteQueryChat";
import useListenChatMessage from "../../hooks/common/useListenChatMessage";

/*
 * チャット
 *
 */
const Chat = () => {
  const bottomRef = useRef(null);
  const { isScrollPosition, judgementScrollPosition } = useScrollPosition();
  const { data, hasPreviousPage, fetchPreviousPage } = useInfiniteQueryChat();
  const { addChatMessage, listenChatMessage } = useListenChatMessage();
  console.log(addChatMessage);
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

    // chatMessageリッスン
    const unsubscribe = listenChatMessage();

    return () => {
      // chatのリスナーでタッチ
      unsubscribe();
    };
  }, [
    isScrollPosition,
    fetchPreviousPage,
    hasPreviousPage,
    judgementScrollPosition,
    listenChatMessage,
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
      {/* チャットメッセージリッスン */}
      {addChatMessage.length > 0 &&
        addChatMessage.map((data) => (
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

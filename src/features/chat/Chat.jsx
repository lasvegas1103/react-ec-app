import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import Header from "../../components/utils/Header";
import SendMessage from "../../components/chat/SendMessage";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/useInfiniteQueryChat";
import useListenLatestChatMessage from "../../hooks/chat/useListenLatestChatMessage";
import useSendChatMessage from "../../hooks/chat/useSendChatMessage";

/*
 * チャット
 *
 */
const Chat = () => {
  const bottomRef = useRef(null);
  const [chatMessage, setChatMessage] = useState("");
  const { sendChatMessage } = useSendChatMessage();
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
      // chatのリスナーデタッチ
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
    <div>
      <Header />
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
                  <p>{data.message}</p>
                </div>
              </div>
            ))
          )}
        {/* 最新のチャットメッセージリッスン */}
        {addLatestChatMessage.length > 0 &&
          addLatestChatMessage.map((data) => (
            <div>
              <div
                key={`latest ${data.id}`}
                className={`msg ${
                  data.userID === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <p>{data.message}</p>
              </div>
            </div>
          ))}
        <div ref={bottomRef} />
      </div>
      {/* メッセージ送信ボタン */}
      <SendMessage
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        sendChatMessage={sendChatMessage}
      />
    </div>
  );
};

export default Chat;

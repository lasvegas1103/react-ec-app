import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import Header from "../../components/utils/Header";
import SendMessage from "../../components/chat/SendMessage";
import useScrollPosition from "../../hooks/common/useScrollPosition";
import useInfiniteQueryChat from "../../hooks/chat/useInfiniteQueryChat";
import useListenLatestChatMessage from "../../hooks/chat/useListenLatestChatMessage";
import useSendChatMessage from "../../hooks/chat/useSendChatMessage";
import useGetChatBotMessage from "../../hooks/chat/useGetChatBotMessage";

/**
 * チャット
 *
 */
const Chat = () => {
  const urlParams = useParams();
  const groupID = urlParams.groupID;
  const bottomRef = useRef(null);
  const [chatMessage, setChatMessage] = useState("");
  const { sendChatMessage } = useSendChatMessage();
  const { getAndSaveBotMessage } = useGetChatBotMessage();
  const { isScrollPosition, judgementScrollPosition } = useScrollPosition();
  const { data, hasPreviousPage, fetchPreviousPage } =
    useInfiniteQueryChat(groupID);
  const { addLatestChatMessage, listenLatestChatMessage } =
    useListenLatestChatMessage(groupID);

  useEffect(() => {
    // 最下部へ移動
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView(false);
    }, 500);
  }, [listenLatestChatMessage]);

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
        groupID={groupID}
        setChatMessage={setChatMessage}
        sendChatMessage={sendChatMessage}
        getAndSaveBotMessage={getAndSaveBotMessage}
      />
    </div>
  );
};

export default Chat;

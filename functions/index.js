const axios = require("axios");
const functions = require("firebase-functions");

/**
 * チャットボットのメッセージを返す
 * return json message
 */
exports.getChatbotMessage = functions.https.onCall(async (message, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("認証エラー", "認証に失敗しました");
  }

  const apiKey = "83d064c4352c86fa8ab0";
  const url =
    "https://chatbot-api.userlocal.jp/api/chat?message=" +
    message +
    "&key=" +
    apiKey;

  return await axios.get(url, {
    responseType: "json",
    responseEncoding: "utf-8",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Accept-Encoding": "identity",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw "errorstatus:".response.status;
    }
    return {"message": response.data};
  }).catch((err) => {
    throw new functions.https.HttpsError(err);
  });
});

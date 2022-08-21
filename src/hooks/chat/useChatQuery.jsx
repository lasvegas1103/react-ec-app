import useQueryWrapper from "../common/useQueryWrapper";
import { getGroupIDAction } from "../../model/Chat";
import { CacheName } from "../../config/constants";

/**
 * チャットメッセージ用
 *
 */
const useChatQuery = (props) => {
  // chatのgroupID取得
  const getGroupID = useQueryWrapper({
    queryKey: CacheName.CHATGROUPID,
    deps: [],
    func: () => getGroupIDAction(),
    options: {},
    errText: "グループIDの取得に失敗しました",
  });

  return { getGroupID };
};

export default useChatQuery;

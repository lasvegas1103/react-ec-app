import { useQuery } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/**
 * useQueryのwrapperコンポーネント
 * @param {string} queryKey
 * @param {array} deps
 * @param {関数} func
 * @param {object} options
 * @param {string} errText
 * @returns 結果
 */
const useQueryWrapper = ({
  queryKey,
  deps = [],
  func,
  options,
  errText = "",
}) => {
  const { toast } = useUtilContext();
  const qk = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey];
  const result = useQuery(
    qk,
    async () => {
      try {
        const result = await func();
        return result;
      } catch (err) {
        toast.error(err.message);
        console.error(err);
      }
    },
    options
  );

  return result;
};

export default useQueryWrapper;

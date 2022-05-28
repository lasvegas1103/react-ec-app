import { useInfiniteQuery } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/* useInfiniteQueryのwrapper関数 */
const useInfiniteQueryWrapper = ({
  queryKey,
  deps = [],
  func,
  options,
  errText = "",
}) => {
  const { toast } = useUtilContext();
  const qk = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey];
  const result = useInfiniteQuery(
    qk,
    async ({ pageParam = 0 }) => {
      try {
        const result = await func(pageParam);

        return result;
      } catch (e) {
        toast.error(errText);
        console.error(e);
      }
    },
    options
  );

  return result;
};

export default useInfiniteQueryWrapper;

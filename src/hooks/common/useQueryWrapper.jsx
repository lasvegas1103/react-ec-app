import { useQuery } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/* useQueryのwrapper関数 */
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
      } catch (e) {
        toast.error(errText);
        console.error(e);
      }
    },
    options
  );

  return result;
};

export default useQueryWrapper;

import { useQuery } from "react-query";

/* useQueryのwrapper関数 */
const useQueryWrapper = ({ queryKey, deps = [], func, options }) => {
  const qk = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey];
  const result = useQuery(
    qk,
    async () => {
      try {
        const result = await func();

        return result;
      } catch (e) {
        console.error(e);
      }
    },
    options
  );

  return result;
};

export default useQueryWrapper;

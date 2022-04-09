import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error(e);
        console.error(e);
      }
    },
    options
  );

  return result;
};

export default useQueryWrapper;

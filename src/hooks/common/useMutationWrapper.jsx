import { useMutation } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/* useMutationのwrapper関数 */
const useMutationWrapper = ({ func, options, errText = "" }) => {
  const { toast } = useUtilContext();
  const result = useMutation((variables) => {
    try {
      const data = func(variables);
      data.catch((e) => {
        toast.error(errText);
        console.error(e);
      });
      return data;
    } catch (e) {
      toast.error(errText);
      console.error(e);
    }
  }, options);
  return result;
};

export default useMutationWrapper;

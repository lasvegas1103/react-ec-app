import { useMutation } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/* useMutationのwrapper関数 */
const useMutationWrapper = ({ func, options, errText = "" }) => {
  const { toast } = useUtilContext();
  const result = useMutation((variables) => {
    const data = func(variables);
    data
      .then((data) => console.log(data))
      .catch((e) => {
        toast.error(errText);
        console.error(e);
      });
    return data;
  }, options);
  return result;
};

export default useMutationWrapper;

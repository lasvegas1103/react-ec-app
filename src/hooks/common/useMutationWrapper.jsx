import { useMutation } from "react-query";
import { useUtilContext } from "../../context/UtilContext";

/**
 * seMutationのwrapperコンポーネント
 * @param {関数} func
 * @param {object} options
 * @param {string} errText
 * @returns 結果
 */
const useMutationWrapper = ({ func, options, errText = "" }) => {
  const { toast } = useUtilContext();
  const result = useMutation((variables) => {
    const data = func(variables);
    data
      .then((data) => console.log(data))
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      });
    return data;
  }, options);
  return result;
};

export default useMutationWrapper;

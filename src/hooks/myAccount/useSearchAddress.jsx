import { useCallback, useState } from "react";
import axios from "axios";

/**
 * 郵便番号から住所を取得
 * @param {*} param0
 */
const useSearchAddress = () => {
  const [address, setAddress] = useState("");

  const searchAddress = useCallback(async (zipCode) => {
    const { data } = await axios.get(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
    );

    // 取得に失敗したら返す
    if (data.status !== 200) return;
    setAddress(data.results[0]);
  }, []);

  return { address, searchAddress };
};

export default useSearchAddress;

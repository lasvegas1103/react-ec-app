import { useState, useCallback } from "react";

/*
 *スクロール位置を判定
 */
const useScrollPosition = () => {
  const [isScrollPosition, setIsScrollPosition] = useState("");

  const judgementScrollPosition = useCallback(() => {
    // bodyの高さ - windowの高さをで引いた、最下部までの高さ
    const extraHeight = document.body.clientHeight - window.innerHeight;
    window.addEventListener("scroll", () => {
      // bodyの高さが取得できない場合、返す
      if (document.body.clientHeight === 0) return;

      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= extraHeight) {
        setIsScrollPosition("end");
      } else if (scrollTop <= 0) {
        setIsScrollPosition("top");
      }
    });
  }, []);

  return { isScrollPosition, judgementScrollPosition };
};
export default useScrollPosition;

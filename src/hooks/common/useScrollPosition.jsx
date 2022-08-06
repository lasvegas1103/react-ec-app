import React, { useState, useEffect } from "react";

/* 
*スクロール位置を判定
*/
const useScrollPosition = () => {
const [isScrollPosition, setIsScrollPosition] = useState("");

useEffect(() => {
    // bodyの高さ - windowの高さをで引いた、最下部までの高さ
    const extraHeight = document.body.clientHeight - window.innerHeight;
    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= extraHeight) {
            setIsScrollPosition("end");
        } else if (scrollTop <= 0) {
            setIsScrollPosition("top");
        }
    })
},[]);

return { isScrollPosition }

}
export default useScrollPosition;
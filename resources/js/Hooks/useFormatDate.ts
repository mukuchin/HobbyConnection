// 日付をフォーマットするカスタムフック

import { useCallback } from "react";

const useFormatDate = () => {
    const formatDate = useCallback((dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScriptの月は0から始まるため、+1する
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }, []);

    return formatDate;
};

export default useFormatDate;

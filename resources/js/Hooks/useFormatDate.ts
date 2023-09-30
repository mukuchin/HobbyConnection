// 日付をフォーマットするカスタムフック

import { useCallback } from "react";

// 日付をフォーマットするカスタムフック
export const useFormatDate = () => {
    const formatDate = useCallback((dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // JavaScriptの月は0から始まるため、+1する
        const day = date.getDate();
        const hours = date.getHours().toString().padStart(2, "0"); // 1桁の場合は0でパディング
        const minutes = date.getMinutes().toString().padStart(2, "0"); // 1桁の場合は0でパディング
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }, []);

    return formatDate;
};

// 期間の日付をフォーマットする
export const useformatPeriodDate = () => {
    const formatPeriodDate = useCallback((dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}/${month}/${day}`;
    }, []);

    return formatPeriodDate;
};

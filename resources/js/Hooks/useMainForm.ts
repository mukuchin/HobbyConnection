// メインフォームのカスタムフック

import { ChangeEvent, FormEvent } from "react";
import { router } from "@inertiajs/react";

// メインフォームの値
interface MainFormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
}

// メインフォームのカスタムフックの返り値
interface MainFormHook {
    handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function useMainForm(
    values: MainFormValues,
    setValues: React.Dispatch<React.SetStateAction<MainFormValues>>,
    // 送信先のエンドポイント
    endpoint: string
): MainFormHook {
    // メインフォームのタイトル、期間の入力値を変更する関数
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
        console.log(values);
    };

    // メインフォームの概要の入力値を変更する関数
    const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
        console.log(values);
    };

    // メインフォームを送信する関数
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(values);
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value === "string") {
                formData.append(key, value);
            }
        });
        console.log(formData);

        // フォームデータを送信する
        if (endpoint.startsWith("/posts/")) {
            // 記事編集ページの場合
            router.put(endpoint, formData);
            console.log("put");
        } else {
            // 記事作成ページの場合
            router.post(endpoint, formData);
            console.log("post");
        }

        console.log(endpoint);
    };

    return {
        handleChangeInput,
        handleChangeTextarea,
        handleSubmit,
    };
}

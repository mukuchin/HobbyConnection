// メインフォームのカスタムフック

import { ChangeEvent, FormEvent } from "react";
import { router } from "@inertiajs/react";

// メインフォームの値
interface MainFormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    sub_form_data: string; // サブフォームのデータ
}

// メインフォームのカスタムフックの返り値
interface MainFormHook {
    handleChangeInput: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function useMainForm(
    values: MainFormValues,
    setValues: React.Dispatch<React.SetStateAction<MainFormValues>>,

    // 送信先のエンドポイント
    endpoint: string
): MainFormHook {
    // メインフォームの入力値を変更する関数
    const handleChangeInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // メインフォームを送信する関数
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // フォームデータを送信する
        if (endpoint.startsWith("/posts/")) {
            // 記事編集ページの場合
            router.put(endpoint, { ...values });
        } else {
            // 記事投稿ページの場合
            router.post(endpoint, { ...values });
        }
    };

    return {
        handleChangeInput,
        handleSubmit,
    };
}

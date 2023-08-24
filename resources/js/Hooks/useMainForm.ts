// メインフォームのカスタムフック

import { ChangeEvent, FormEvent } from "react";
import { router, usePage } from "@inertiajs/react";

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
    setValues: React.Dispatch<React.SetStateAction<MainFormValues>>
): MainFormHook {
    // メインフォームのタイトル、期間の入力値を変更する関数
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // メインフォームの説明の入力値を変更する関数
    const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // メインフォームを送信する関数
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value === "string") {
                formData.append(key, value);
            }
        });

        // フォームデータを送信する
        router.post("/posts", formData);
    };

    return {
        handleChangeInput,
        handleChangeTextarea,
        handleSubmit,
    };
}

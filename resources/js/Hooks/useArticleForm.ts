// 記事フォームのカスタムフック

import { ChangeEvent, FormEvent } from "react";
import { router } from "@inertiajs/react";

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    sub_form_data: string[];
}

// フォーム入力・送信のカスタムフックの返り値
interface MainFormHook {
    handleChangeInput: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleChangeSubFormInput: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// サブフォーム追加・削除のカスタムフックの返り値
interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

export function useArticleForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>,
    endpoint: string // フォームデータを送信するエンドポイント
): MainFormHook {
    // メインフォームの入力値を変更する関数
    const handleChangeInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // サブフォームの入力値を変更する関数
    const handleChangeSubFormInput = (
        e: ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {
        const newSubFormData = [...values.sub_form_data];
        newSubFormData[index] = e.target.value;
        setValues((prev) => ({ ...prev, sub_form_data: newSubFormData }));
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
        handleChangeSubFormInput,
        handleSubmit,
    };
}

export function useAddDeleteSubForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>
): SubFormHook {
    // サブフォームを追加する関数
    const addSubForm = () => {
        const newSubFormData = [...values.sub_form_data, ""];
        setValues((prev) => ({ ...prev, sub_form_data: newSubFormData }));
    };

    // サブフォームを削除する関数
    const deleteSubForm = (index: number) => {
        const newSubFormData = values.sub_form_data.filter(
            (_, i) => i !== index
        );
        setValues((prev) => ({ ...prev, sub_form_data: newSubFormData }));
    };

    return { addSubForm, deleteSubForm };
}

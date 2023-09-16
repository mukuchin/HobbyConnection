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
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const key = e.target.name;
        const value = e.target.value;

        if (key.startsWith("sub_form_data") && typeof index === "number") {
            const newSubFormData = [...values.sub_form_data];
            newSubFormData[index] = value;
            setValues((prev) => ({ ...prev, sub_form_data: newSubFormData }));
        } else {
            setValues((prev) => ({ ...prev, [key]: value }));
        }
    };

    // フォームデータを送信する関数
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(endpoint, formData, {
            onBefore: (visit) => {
                visit.headers["Content-Type"] = "multipart/form-data";
            },
        });
        console.log([...formData.entries()]);
    };

    return {
        handleChangeInput: handleChange,
        handleChangeSubFormInput: handleChange,
        handleSubmit,
    };
}

// サブフォームの追加・削除のカスタムフック
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

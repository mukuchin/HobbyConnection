// 記事フォームのカスタムフック

import { ChangeEvent, FormEvent } from "react";
import { router } from "@inertiajs/react";

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image?: string | ArrayBuffer | null;
    sub_form_data: string[];
    delete_image?: string;
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
    cancelImagePreview: () => void;
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
    // フォームの入力値を変更する関数
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const key = e.target.name;
        const value = e.target.value;

        // サブフォームの入力値を変更する場合
        if (key.startsWith("sub_form_data") && typeof index === "number") {
            const newSubFormData = [...values.sub_form_data];
            newSubFormData[index] = value;
            setValues((prev) => ({ ...prev, sub_form_data: newSubFormData }));
        }
        // 画像ファイルを変更する場合
        else if (key === "image" && e.target instanceof HTMLInputElement) {
            const file = e.target.files?.[0];
            if (file && file.name) {
                const allowedExtensions = ["jpg", "jpeg", "gif", "png"];
                const fileExtension = file.name.split(".").pop()?.toLowerCase();

                if (
                    fileExtension &&
                    !allowedExtensions.includes(fileExtension)
                ) {
                    alert(
                        "無効なファイル形式です。jpg, gif, pngのみ許可されています。"
                    );
                    return; // ここで処理を終了
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const target = event.target as FileReader;
                    if (typeof target.result === "string") {
                        setValues((prev) => ({
                            ...prev,
                            image: target.result,
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setValues((prev) => ({ ...prev, [key]: value }));
        }
    };

    // 画像のプレビューをキャンセルする関数
    const cancelImagePreview = () => {
        setValues((prev) => ({ ...prev, image: null, delete_image: "true" }));
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
    };

    return {
        handleChangeInput: handleChange,
        handleChangeSubFormInput: handleChange,
        handleSubmit,
        cancelImagePreview,
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

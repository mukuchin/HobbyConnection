// 記事フォームのカスタムフック

import { ChangeEvent, FormEvent, useCallback } from "react";
import { router } from "@inertiajs/react";
import React from "react";

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image?: string | ArrayBuffer | null;
    sub_form_data: { id?: number; comment: string }[];
    delete_image?: string;
}

// フォームの入力値の初期値
interface MainFormHook {
    handleChangeInput: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleChangeSubFormInput: (
        e: ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    cancelImagePreview: () => void;
}

// サブフォームの追加・削除
interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

// カスタムフックの型
export function useArticleForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>,
    endpoint: string
): MainFormHook {
    const updateValues = useCallback(
        (updatedValues: Partial<FormValues>) => {
            setValues((prev) => ({ ...prev, ...updatedValues }));
        },
        [setValues]
    );

    // フォームの入力値を更新
    const handleChange = useCallback(
        (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            index?: number
        ) => {
            const { name, value } = e.target;

            // サブフォームのコメント欄の入力値を更新
            if (name.startsWith("sub_form_data") && typeof index === "number") {
                const newSubFormData = [...values.sub_form_data];
                newSubFormData[index] = {
                    ...newSubFormData[index],
                    comment: value,
                };
                updateValues({ sub_form_data: newSubFormData });
            } else if (
                name === "image" &&
                e.target instanceof HTMLInputElement
            ) {
                const file = e.target.files?.[0];
                if (file) {
                    const allowedExtensions = ["jpg", "jpeg", "gif", "png"];
                    const fileExtension = file.name
                        .split(".")
                        .pop()
                        ?.toLowerCase();

                    if (
                        !fileExtension ||
                        !allowedExtensions.includes(fileExtension)
                    ) {
                        alert(
                            "無効なファイル形式です。jpg, gif, pngのみ許可されています。"
                        );
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const target = event.target as FileReader;
                        if (typeof target.result === "string") {
                            updateValues({ image: target.result });
                        }
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                updateValues({ [name]: value });
            }
        },
        [updateValues, values]
    );

    // 画像のプレビューをキャンセル
    const cancelImagePreview = useCallback(() => {
        updateValues({ image: null, delete_image: "true" });
    }, [updateValues]);

    // フォームを送信
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

// サブフォームの追加・削除
export function useAddDeleteSubForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>
): SubFormHook {
    const updateValues = (updatedValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...updatedValues }));
    };

    const addSubForm = useCallback(() => {
        const newSubFormData = [...values.sub_form_data, { comment: "" }];
        updateValues({ sub_form_data: newSubFormData });
    }, [values, updateValues]);

    const deleteSubForm = useCallback(
        (index: number) => {
            const newSubFormData = values.sub_form_data.filter(
                (_, i) => i !== index
            );
            updateValues({ sub_form_data: newSubFormData });
        },
        [values, updateValues]
    );

    return { addSubForm, deleteSubForm };
}

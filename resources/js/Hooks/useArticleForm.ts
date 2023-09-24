// 記事フォームのカスタムフック

import { ChangeEvent, FormEvent, useCallback } from "react";
import { router } from "@inertiajs/react";

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image?: string | null;
    sub_form_data: {
        id?: number;
        comment: string;
        image?: string | null;
        file?: File;
        delete_image?: boolean;
    }[];
    delete_image?: boolean;
}

// フォームの入力値の初期値
interface MainFormHook {
    handleChangeInput: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleChangeSubFormInput: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    cancelImagePreview: () => void;
    cancelCancelImagePreview: () => void;
}

// サブフォームの追加・削除
interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

const allowedExtensions = ["jpg", "jpeg", "gif", "png"];

// ファイルの拡張子が許可されているかどうか
const isValidFileExtension = (filename: string) => {
    const fileExtension = filename.split(".").pop()?.toLowerCase();
    return fileExtension && allowedExtensions.includes(fileExtension);
};

// フォームの入力値の初期値
export function useArticleForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>,
    endpoint: string
): MainFormHook {
    // フォームの入力値を更新する
    const updateValues = (updatedValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...updatedValues }));
    };

    // 画像のプレビューを表示する
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file || !isValidFileExtension(file.name)) {
            alert(
                "無効なファイル形式です。jpg, gif, pngのみ許可されています。"
            );
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const target = event.target as FileReader;
            if (typeof target.result === "string") {
                if (typeof index === "number") {
                    const newSubFormData = [...values.sub_form_data];
                    newSubFormData[index] = {
                        ...newSubFormData[index],
                        image: target.result,
                        file: file,
                    };
                    updateValues({ sub_form_data: newSubFormData });
                } else {
                    updateValues({ image: target.result });
                }
            }
        };
        reader.readAsDataURL(file);
    };

    // フォームの入力値を更新する
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("sub_form_data") && typeof index === "number") {
            const fieldName = name.split("][")[1].replace("]", "");
            if (fieldName === "comment") {
                const newSubFormData = [...values.sub_form_data];
                newSubFormData[index].comment = value;
                setValues((prev) => ({
                    ...prev,
                    sub_form_data: newSubFormData,
                }));
            } else if (fieldName === "image") {
                // サブフォームの画像
                handleImageChange(e, index);
            }
        } else if (name === "image") {
            // メインフォームの画像
            handleImageChange(e);
        } else {
            // その他のフォーム
            updateValues({ [name]: value });
        }
    };

    // 画像のプレビューをキャンセルする。メインフォームの画像とサブフォームの画像の両方に対応
    const cancelImagePreview = (index?: number) => {
        if (typeof index === "number") {
            // サブフォームの画像
            const newSubFormData = [...values.sub_form_data];
            newSubFormData[index] = {
                ...newSubFormData[index],
                image: null,
                file: undefined,
                delete_image: true,
            };
            updateValues({ sub_form_data: newSubFormData });
        } else if (values.image) {
            // メインフォームの画像。
            updateValues({ image: null, delete_image: true });
        }
    };

    // 画像のプレビューのキャンセルをキャンセルする。メインフォームの画像とサブフォームの画像の両方に対応
    const cancelCancelImagePreview = (index?: number) => {
        if (typeof index === "number") {
            // サブフォームの画像
            const newSubFormData = [...values.sub_form_data];
            newSubFormData[index] = {
                ...newSubFormData[index],
                delete_image: false,
            };
            updateValues({ sub_form_data: newSubFormData });
        } else {
            // メインフォームの画像。
            updateValues({ delete_image: false });
        }
    };

    // フォームを送信する
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(values);

        // コメントまたは画像が存在するサブフォームだけをフィルタリング
        const filteredSubFormData = values.sub_form_data.filter(
            (data) => data.comment || data.image
        );

        console.log(filteredSubFormData);

        const formData = new FormData(e.currentTarget);

        // メインフォームの画像ファイルを追加
        const mainImageInput = e.currentTarget.elements.namedItem(
            "image"
        ) as HTMLInputElement;
        if (mainImageInput?.files?.[0]) {
            formData.append("image", mainImageInput.files[0]);
        }

        // フィルタリングされたサブフォームの画像ファイルを追加
        filteredSubFormData.forEach((data, index) => {
            if (data.file) {
                formData.append(`sub_form_data[${index}][image]`, data.file);
            }
            // サブフォームのコメントを追加。コメントがnullの場合は空文字を追加
            formData.append(
                `sub_form_data[${index}][comment]`,
                data.comment || ""
            );
        });

        // console.log(...formData.entries());

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
        cancelCancelImagePreview,
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

    // サブフォームを追加する
    const addSubForm = useCallback(() => {
        const newSubFormData = [
            ...values.sub_form_data,
            { comment: "", image: null },
        ];
        updateValues({ sub_form_data: newSubFormData });
    }, [values, updateValues]);

    // サブフォームを削除する
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

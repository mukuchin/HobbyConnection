// 記事フォームのカスタムフック

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
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
    tags: string[];
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
    cancelImagePreview: (
        fileInputRef: React.RefObject<HTMLInputElement>,
        index?: number
    ) => void;
    cancelCancelImagePreview: () => void;
    addTag: (tag: string) => void;
    removeTag: (index: number) => void;
}

// サブフォームの追加・削除
interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

const allowedExtensions = ["jpg", "jpeg", "gif", "png"];

// ファイルの拡張子が許可されているかどうかを判定する
const isValidFileExtension = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
        return false;
    }
    return true;
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

    // 前回選択されたファイルを保持するステート
    const [lastSelectedFile, setLastSelectedFile] = useState<File | null>(null);

    // タグを追加する関数
    const addTag = (tag: string) => {
        if (tag && !values.tags.includes(tag)) {
            setValues((prevValues) => ({
                ...prevValues,
                tags: [...prevValues.tags, tag],
            }));
        }
    };

    // タグを削除する関数
    const removeTag = (index: number) => {
        setValues((prevValues) => ({
            ...prevValues,
            tags: prevValues.tags.filter((_, i) => i !== index),
        }));
    };

    // 画像のプレビューを表示する
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const target = e.target as HTMLInputElement;

        // ファイルが選択されていない場合、前回のファイルを復元
        if (!target.files || target.files.length === 0) {
            if (lastSelectedFile) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(lastSelectedFile);
                target.files = dataTransfer.files;
            }
            return;
        }

        // ファイルが選択されている場合、選択されたファイルを取得
        const file = target.files[0];

        // 前回選択されたファイルを更新
        setLastSelectedFile(file);

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
                        delete_image: false,
                    };
                    updateValues({ sub_form_data: newSubFormData });
                } else {
                    updateValues({ image: target.result, delete_image: false });
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
    const cancelImagePreview = (
        fileInputRef: React.RefObject<HTMLInputElement>,
        index?: number
    ) => {
        // ユーザーに確認を求める
        if (!window.confirm("画像を削除してもよろしいですか？")) {
            return; // キャンセルをクリックした場合、処理を終了
        }
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

        // ファイル入力の値をリセット
        if (fileInputRef && fileInputRef.current) {
            fileInputRef.current.value = "";
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

        // コメントまたは画像が存在するサブフォームだけをフィルタリング
        const filteredSubFormData = values.sub_form_data.filter(
            (data) => data.comment || data.image
        );

        const formData = new FormData(e.currentTarget);

        // タグを追加
        values.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

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
        addTag,
        removeTag,
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
            // ユーザーに確認を求める
            if (
                !window.confirm(`投稿${index + 1}を削除してもよろしいですか？`)
            ) {
                return; // キャンセルをクリックした場合、処理を終了
            }

            const newSubFormData = values.sub_form_data.filter(
                (_, i) => i !== index
            );
            updateValues({ sub_form_data: newSubFormData });
        },
        [values, updateValues]
    );

    return { addSubForm, deleteSubForm };
}

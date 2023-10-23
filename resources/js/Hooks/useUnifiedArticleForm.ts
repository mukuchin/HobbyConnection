// 統合した記事フォームのカスタムフック

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { router } from "@inertiajs/react";

// フォームの入力値の初期値とサブフォームの追加・削除を統合
interface UnifiedFormHook extends FormHook, SubFormHook {}

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image?: string | null;
    sub_form_data: {
        id?: number;
        heading: string;
        comment: string;
        image?: string | null;
        file?: File;
        delete_image?: boolean;
    }[];
    delete_image?: boolean;
    tags: string[];
}

// フォームの入力値の初期値
interface FormHook {
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
    handleConfirmSubmit: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

// サブフォームの追加・削除
interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

// 許可されているファイルの拡張子
const allowedExtensions = ["jpg", "jpeg", "gif", "png"];

// ファイルの拡張子が許可されているかどうかを判定する
const isValidFileExtension = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
        return false;
    }
    return true;
};

export function useUnifiedArticleForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>,
    endpoint: string
): UnifiedFormHook {
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

    // フォームの入力値を更新する
    const updateValues = (updatedValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...updatedValues }));
    };

    // 前回選択されたファイルを保持するステート。フォームごとに保持するため、配列にしている。
    const [lastSelectedFiles, setLastSelectedFiles] = useState<{
        [key: string]: File | null;
    }>({});

    // 画像のプレビューを表示する
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const target = e.target as HTMLInputElement;

        // ファイル選択ダイアログでキャンセルを選択した場合、前回選択されたファイルを復元
        if (!target.files || target.files.length === 0) {
            const previousFileKey =
                typeof index === "number" ? "sub-" + index : "main";
            const previousFile = lastSelectedFiles[previousFileKey];
            if (previousFile) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(previousFile);
                target.files = dataTransfer.files;
            }
            return;
        }

        // ファイルが選択されている場合、選択されたファイルを取得
        const file = target.files ? target.files[0] : null;

        // ファイルの拡張子が許可されているかどうかを判定
        if (file && !isValidFileExtension(file.name)) {
            alert(
                "無効なファイル形式です。jpg, gif, pngのみ許可されています。"
            );
            const previousFileKey =
                typeof index === "number" ? "sub-" + index : "main";
            const previousFile = lastSelectedFiles[previousFileKey];
            if (previousFile) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(previousFile); // 前回選択されたファイルを復元
                target.files = dataTransfer.files;
            } else {
                target.value = "";
            }
            return;
        }

        // 有効なファイル形式の場合、前回選択されたファイルを更新
        if (file) {
            setLastSelectedFiles((prevFiles) => {
                const key = typeof index === "number" ? "sub-" + index : "main";
                return { ...prevFiles, [key]: file };
            });
        }

        // 画像のプレビューを表示
        if (file) {
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
                        updateValues({
                            image: target.result,
                            delete_image: false,
                        });
                    }
                }
            };
            reader.readAsDataURL(file);
        }
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
            } else if (fieldName === "heading") {
                const newSubFormData = [...values.sub_form_data];
                newSubFormData[index].heading = value;
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
            // メインフォームの画像
            updateValues({ image: null, delete_image: true });
        }

        // ファイル入力の値をリセット
        if (fileInputRef && fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        // lastSelectedFiles ステートをリセット
        setLastSelectedFiles((prevFiles) => {
            const key = typeof index === "number" ? "sub-" + index : "main";
            return { ...prevFiles, [key]: null };
        });
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

        // // formDataを初期化
        const formData = new FormData();

        // メインフォームのデータを追加
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("period_start", values.period_start);
        formData.append("period_end", values.period_end);
        formData.append("delete_image", values.delete_image ? "true" : "false");

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

        // period_startがnullの場合はformDataのperiod_startを削除し、空文字に置換
        if (values.period_start === null) {
            formData.delete("period_start");
            formData.append("period_start", "");
        }

        // period_endがnullの場合はformDataのperiod_endを削除し、空文字に置換
        if (values.period_end === null) {
            formData.delete("period_end");
            formData.append("period_end", "");
        }

        // 見出し及びコメント及び画像が存在するサブフォームだけをフィルタリング
        const filteredSubFormData = values.sub_form_data.filter(
            (data) =>
                data.heading ||
                data.comment ||
                (data.image && !data.delete_image)
        );

        // フィルタリングされたサブフォームのデータをformDataに追加
        filteredSubFormData.forEach((data, index) => {
            // delete_imageの値をformDataに追加
            formData.append(
                `sub_form_data[${index}][delete_image]`,
                data.delete_image ? "true" : "false"
            );

            if (data.file) {
                formData.append(`sub_form_data[${index}][image]`, data.file);
            }
            formData.append(
                `sub_form_data[${index}][heading]`,
                data.heading || ""
            );
            formData.append(
                `sub_form_data[${index}][comment]`,
                data.comment || ""
            );

            // idをformDataに追加
            if (data.id) {
                formData.append(`sub_form_data[${index}][id]`, data.id + "");
            }
        });

        // サブフォームの削除フラグを追加
        router.post(endpoint, formData, {
            onBefore: (visit) => {
                visit.headers["Content-Type"] = "multipart/form-data";
            },
        });
    };

    // 確認のアラートを表示する関数
    const handleConfirmSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const baseMessage =
            location.pathname === "/create"
                ? "記事を投稿しますか？"
                : "記事を更新しますか？";

        const additionalMessage = `
以下の情報の投稿を行うことはできません。
(1) 他ユーザーを不快にさせる投稿
(2) いいねなどリアクション自体を目的とした投稿
(3) 趣味と関係のない投稿
(4) 未成年の不健全な出会いや集まりの計画・勧誘
(5) 誹謗中傷・暴言・わいせつな投稿
(6) 著作権や肖像権・プライバシーを侵害する行為
(7) 荒らし行為・違法行為・その他の迷惑行為

`;

        if (!window.confirm(additionalMessage + baseMessage)) {
            e.preventDefault();
        }
    };

    // サブフォームを追加する
    const addSubForm = useCallback(() => {
        const newSubFormData = [
            ...values.sub_form_data,
            { heading: "", comment: "", image: null },
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

            // lastSelectedFiles ステートを更新
            const newLastSelectedFiles: { [key: string]: File | null } = {};
            Object.entries(lastSelectedFiles).forEach(([key, file]) => {
                const match = key.match(/^sub-(\d+)$/);
                if (match) {
                    const idx = parseInt(match[1], 10);
                    if (idx < index) {
                        newLastSelectedFiles[key] = file as File | null;
                    } else if (idx > index) {
                        newLastSelectedFiles[`sub-${idx - 1}`] =
                            file as File | null;
                    }
                } else {
                    newLastSelectedFiles[key] = file as File | null;
                }
            });
            setLastSelectedFiles(newLastSelectedFiles);
        },
        [values, updateValues, lastSelectedFiles]
    );

    return {
        handleChangeInput: handleChange,
        handleChangeSubFormInput: handleChange,
        handleSubmit,
        cancelImagePreview,
        cancelCancelImagePreview,
        addTag,
        removeTag,
        handleConfirmSubmit,
        addSubForm,
        deleteSubForm,
    };
}

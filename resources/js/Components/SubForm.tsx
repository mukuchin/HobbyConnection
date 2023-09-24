// サブフォームコンポーネント

import React, { useRef } from "react";
import { FormValues, useAddDeleteSubForm } from "@/Hooks/useArticleForm";

// このコンポーネントで使用するpropsの型定義
interface SubFormProps {
    id?: number;
    index: number;
    handleChange: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => void;
    values: {
        title: string;
        period_start: string;
        period_end: string;
        description: string;
        sub_form_data: {
            id?: number;
            comment: string;
            image?: string | null;
            delete_image?: boolean;
        }[];
    };
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
    cancelImagePreview: (index: number) => void;
    cancelCancelImagePreview: (index: number) => void;
}

// サブフォーム
const SubForm: React.FC<SubFormProps> = ({
    index,
    handleChange,
    values,
    setValues,
    cancelImagePreview,
    cancelCancelImagePreview,
}) => {
    // サブフォームの追加・削除を行うカスタムフック
    const { deleteSubForm } = useAddDeleteSubForm(values, setValues);

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // URLかどうかを判定する関数
    const isFullURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={`sub_form_data_${index}`}>投稿 {index + 1}</label>
            {/* サブフォームのプレビュー画像。画像がある場合のみ表示する。 */}
            {values.sub_form_data[index].image && (
                <div className="mb-4">
                    <img
                        src={
                            isFullURL(
                                values.sub_form_data[index].image as string
                            )
                                ? (values.sub_form_data[index].image as string)
                                : `https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${values.sub_form_data[index].image}`
                        }
                        alt="サブフォームのプレビュー画像"
                        className="mb-4"
                        width="300"
                    />
                    {/* 記事TOP画像のプレビューをキャンセルするボタン */}
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => cancelImagePreview(index)}
                    >
                        削除
                    </button>
                </div>
            )}
            {/* サブフォームの画像削除フラグ */}
            <input
                type="hidden"
                name={`sub_form_data[${index}][delete_image]`}
                value={
                    values.sub_form_data[index].delete_image
                        ? (true as unknown as string)
                        : (false as unknown as string)
                }
            />
            <label htmlFor={`sub_form_data_${index}_image`}>
                {values.sub_form_data[index].image
                    ? "変更する画像を選択"
                    : "画像を選択"}
            </label>
            {/* サブフォームの画像入力欄 */}
            <input
                type="file"
                name={`sub_form_data[${index}][image]`}
                onChange={(e) => {
                    handleChange(e, index);
                    cancelCancelImagePreview(index);
                }}
                ref={fileInputRef as React.Ref<HTMLInputElement>}
            />
            {/* サブフォームのコメント入力欄 */}
            <textarea
                className="form-control"
                id={`sub_form_data_${index}`}
                name={`sub_form_data[${index}][comment]`}
                // サブフォームのコメントの初期値は、サブフォームの値。nullの場合は、空文字を設定する。
                value={values.sub_form_data[index].comment}
                onChange={(e) => handleChange(e, index)}
            ></textarea>
            {/* サブフォームのid。サブフォームのidがある場合のみ表示する。 */}
            <input
                type="hidden"
                name={`sub_form_data[${index}][id]`}
                value={values.sub_form_data[index].id}
            />
            {/* サブフォームの削除ボタン */}
            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteSubForm(index)}
            >
                投稿 {index + 1} を削除
            </button>
        </div>
    );
};

export default SubForm;

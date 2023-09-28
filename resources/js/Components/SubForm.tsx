// サブフォームコンポーネント

import React, { useRef } from "react";
import { FormValues, useAddDeleteSubForm } from "@/Hooks/useArticleForm";
import InputField from "../Layouts/InputField";
import { usePage } from "@inertiajs/react";
import { isFullURL } from "../Hooks/useURLValidators";

// このコンポーネントで使用するpropsの型定義
interface SubFormProps {
    id?: number;
    index: number;
    handleChange: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => void;
    values: FormValues;
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
    cancelImagePreview: (
        fileInputRef: React.RefObject<HTMLInputElement>,
        index?: number
    ) => void;
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

    // エラーを取得
    const { errors } = usePage().props;

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="form-group p-4 border rounded-md shadow-md">
            <label
                htmlFor={`sub_form_data_${index}`}
                className="block font-bold text-lg mb-2"
            >
                投稿 {index + 1}
            </label>
            <div className="flex">
                <div className="w-1/2 pr-4">
                    {values.sub_form_data[index].image && (
                        <div className="mb-4">
                            <img
                                src={
                                    isFullURL(
                                        values.sub_form_data[index]
                                            .image as string
                                    )
                                        ? (values.sub_form_data[index]
                                              .image as string)
                                        : `https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${values.sub_form_data[index].image}`
                                }
                                alt="サブフォームのプレビュー画像"
                                className="mb-4 rounded-md shadow-md"
                                width="500"
                            />
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    cancelImagePreview(fileInputRef, index);
                                }}
                            >
                                画像を削除
                            </button>
                        </div>
                    )}

                    <input
                        type="hidden"
                        name={`sub_form_data[${index}][delete_image]`}
                        value={
                            values.sub_form_data[index].delete_image
                                ? "true"
                                : "false"
                        }
                    />

                    <InputField
                        label={
                            values.sub_form_data[index].image
                                ? "変更する画像を選択"
                                : "画像を選択"
                        }
                        type="file"
                        id={`sub_form_data_${index}_image`}
                        name={`sub_form_data[${index}][image]`}
                        onChange={(e) => {
                            handleChange(e, index);
                            cancelCancelImagePreview(index);
                        }}
                        ref={fileInputRef}
                        errors={errors}
                    />

                    {errors[`sub_form_data.${index}.image`] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors[`sub_form_data.${index}.image`]}
                        </p>
                    )}
                </div>

                <div className="w-1/2 flex flex-col justify-between">
                    <div>
                        <InputField
                            label="コメント"
                            type="textarea"
                            id={`sub_form_data_${index}`}
                            name={`sub_form_data[${index}][comment]`}
                            value={values.sub_form_data[index].comment}
                            onChange={(e) => handleChange(e, index)}
                            errors={errors}
                        />

                        {errors[`sub_form_data.${index}.comment`] && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors[`sub_form_data.${index}.comment`]}
                            </p>
                        )}

                        <input
                            type="hidden"
                            name={`sub_form_data[${index}][id]`}
                            value={values.sub_form_data[index].id}
                        />
                    </div>

                    <button
                        type="button"
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteSubForm(index)}
                    >
                        投稿 {index + 1} を削除
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubForm;

// サブフォームコンポーネント

import React, { memo, useRef } from "react";
import { FormValues } from "@/Hooks/useUnifiedArticleForm";
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
    cancelImagePreview: (
        fileInputRef: React.RefObject<HTMLInputElement>,
        index?: number
    ) => void;
    cancelCancelImagePreview: (index: number) => void;
    deleteSubForm: (index: number) => void;
}

// サブフォーム
const SubForm: React.FC<SubFormProps> = ({
    index,
    handleChange,
    values,
    cancelImagePreview,
    cancelCancelImagePreview,
    deleteSubForm,
}) => {
    // エラーを取得
    const { errors } = usePage().props;

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="bg-white mb-4 form-group p-4 border rounded-md shadow-md font-noto-sans-jp">
            <label
                htmlFor={`sub_form_data_${index}`}
                className="block font-bold text-xl mb-4"
            >
                投稿 {index + 1}
            </label>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                    {/* 画像のプレビュー */}
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
                            />
                        </div>
                    )}

                    {/* 画像の削除フラグ */}
                    <input
                        type="hidden"
                        name={`sub_form_data[${index}][delete_image]`}
                        value={
                            values.sub_form_data[index].delete_image
                                ? "true"
                                : "false"
                        }
                    />

                    {/* 画像の入力 */}
                    <div className="flex flex-row items-center">
                        <div className="hidden">
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
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 flex flex-row rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                            onClick={() => fileInputRef.current?.click()} // このボタンがクリックされたときに、非表示のファイル入力をトリガーします
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        </button>
                        {/* 選択されたファイルを削除するボタン */}
                        {values.sub_form_data[index].image && (
                            <button
                                type="button"
                                className="ml-4 bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 flex flex-row rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                                onClick={() => {
                                    cancelImagePreview(fileInputRef, index);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* 画像のエラーメッセージを表示 */}
                    {errors[`sub_form_data.${index}.image`] && (
                        <p className="mt-2 text-red-500">
                            {errors[`sub_form_data.${index}.image`]}
                        </p>
                    )}
                    {/* 画像の合計サイズのエラーメッセージを表示 */}
                    {errors.total_image_size && (
                        <p className="mt-2 text-red-500">
                            {errors.total_image_size}
                        </p>
                    )}
                    {/* 画像の合計数のエラーメッセージを表示 */}
                    {errors.total_files && (
                        <p className="mt-2 text-red-500">
                            {errors.total_files}
                        </p>
                    )}
                    {/* ファイル形式・サイズの注意書き */}
                    <p className="mt-4 mb-4 text-xs text-gray-500">
                        画像サイズは最大2MBです。また、一度の投稿・更新で追加できる画像の合計サイズは最大20MBです。ファイル形式はjpg,
                        jpeg, gif, pngに対応しています。
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    {/* 見出しの入力 */}
                    <div className="mb-4">
                        <InputField
                            label="見出し"
                            type="text"
                            id={`sub_form_data_${index}_heading`}
                            name={`sub_form_data[${index}][heading]`}
                            placeholder="東京から群馬へ"
                            value={values.sub_form_data[index].heading}
                            onChange={(e) => handleChange(e, index)}
                        />
                    </div>
                    {/* コメントの入力 */}
                    <div className="mb-4">
                        <InputField
                            label="コメント"
                            type="textarea"
                            id={`sub_form_data_${index}`}
                            name={`sub_form_data[${index}][comment]`}
                            placeholder="1日目の午前10:00に東京を出発しました。グランピング施設までは社長が運転してくれました。"
                            value={values.sub_form_data[index].comment}
                            onChange={(e) => handleChange(e, index)}
                            textareaHeight="h-48 md:h-96"
                        />
                        <input
                            type="hidden"
                            name={`sub_form_data[${index}][id]`}
                            value={values.sub_form_data[index].id}
                        />
                    </div>
                </div>
            </div>
            {/* サブフォームの削除ボタン */}
            <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 flex flex-row rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                    onClick={() => deleteSubForm(index)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default memo(SubForm);

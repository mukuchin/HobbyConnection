// メインフォームのコンポーネント

import React, { useRef } from "react";
import { usePage } from "@inertiajs/react";
import { FormValues, useAddDeleteSubForm } from "../Hooks/useArticleForm";
import SubForm from "./SubForm";
import InputField from "../Layouts/InputField";
import { isFullURL } from "../Hooks/useURLValidators";

// このコンポーネントで使用するpropsの型定義
interface MainFormProps {
    values: FormValues;
    handleChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
    handleChangeSubFormInput: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => void;
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

// メインフォーム
const MainForm: React.FC<MainFormProps> = ({
    values,
    handleChangeInput,
    handleSubmit,
    setValues,
    handleChangeSubFormInput,
    cancelImagePreview,
    cancelCancelImagePreview,
    addTag,
    removeTag,
    handleConfirmSubmit,
}) => {
    // エラーを取得
    const { errors } = usePage().props;

    // サブフォームの追加・削除を行うカスタムフック
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border rounded-md shadow-md p-4 font-noto-sans-jp">
                <h3 className="font-bold text-2xl mb-4">記事TOP</h3>
                {/* *についての説明。 */}
                <p className="mb-4 text-xs text-gray-600">
                    <span className="text-red-500">*</span>は必須項目です。
                </p>

                <div className="flex flex-col md:flex-row">
                    {/* 画像のプレビュー */}
                    <div className="w-full md:w-1/2 pr-4 mb-4">
                        {values.image && (
                            <div className="mb-4">
                                <img
                                    src={
                                        isFullURL(values.image as string)
                                            ? (values.image as string)
                                            : `https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${values.image}`
                                    }
                                    alt="プレビュー画像"
                                    className="mb-4 rounded-md shadow-md"
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                                    onClick={() => {
                                        cancelImagePreview(fileInputRef);
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
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="delete_image"
                            value={values.delete_image ? "true" : "false"}
                        />

                        {/* 画像のアップロード。記事TOPの枠の下側に表示 */}
                        <InputField
                            label={
                                values.image
                                    ? "変更する画像を選択"
                                    : "画像を選択"
                            }
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => {
                                handleChangeInput(e);
                                cancelCancelImagePreview();
                            }}
                            ref={fileInputRef}
                        />
                        {/* 画像サイズのエラーメッセージを表示 */}
                        {errors.image && (
                            <p className="text-red-500">{errors.image}</p>
                        )}
                        {/* 画像の合計サイズのエラーメッセージを表示 */}
                        {errors.total_image_size && (
                            <p className="text-red-500">
                                {errors.total_image_size}
                            </p>
                        )}
                        {/* ファイル形式・サイズの注意書き */}
                        <p className="text-xs text-gray-500">
                            画像サイズは最大2MBです。また、一度の投稿・更新で追加できる画像の合計サイズは最大20MBです。ファイル形式はjpg,
                            jpeg, gif, pngに対応しています。
                        </p>
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <div className="mb-4">
                            <InputField
                                label={
                                    <>
                                        タイトル
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type="text"
                                id="title"
                                name="title"
                                placeholder="群馬でグランピング！"
                                value={values.title}
                                onChange={handleChangeInput}
                            />
                            {/* エラーメッセージを表示 */}
                            {errors.title && (
                                <p className="text-red-500">{errors.title}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <InputField
                                label="開始日"
                                type="date"
                                id="period_start"
                                name="period_start"
                                value={values.period_start}
                                onChange={handleChangeInput}
                            />
                            {/* エラーメッセージを表示 */}
                            {errors.period_start && (
                                <p className="text-red-500">
                                    {errors.period_start}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <InputField
                                label="終了日"
                                type="date"
                                id="period_end"
                                name="period_end"
                                value={values.period_end}
                                onChange={handleChangeInput}
                            />
                            {/* エラーメッセージを表示 */}
                            {errors.period_end && (
                                <p className="text-red-500">
                                    {errors.period_end}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <InputField
                                label={
                                    <>
                                        概要
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type="textarea"
                                id="description"
                                name="description"
                                placeholder="社員旅行でグランピングに行ってきました！場所は群馬県のグランピング施設「グランピングリゾート群馬BLISSFUL GARDEN」です！今回はグランピングの魅力やBLISSFUL GARDENの魅力を紹介します！"
                                value={values.description}
                                onChange={handleChangeInput}
                                textareaHeight="h-48"
                            />
                            {/* エラーメッセージを表示 */}
                            {errors.description && (
                                <p className="text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        {/* タグ関連の部分 */}
                        <label
                            htmlFor="tag"
                            className="block text-xl font-medium text-gray-700"
                        >
                            タグ
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                id="tag"
                                name="tags[]"
                                placeholder="グランピング"
                                className="mt-1 p-2 border rounded flex-grow min-w-0"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const input = e.currentTarget;
                                        if (input.value.trim() !== "") {
                                            addTag(input.value);
                                            input.value = "";
                                        }
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    const input = e.currentTarget
                                        .previousElementSibling as HTMLInputElement;
                                    addTag(input.value);
                                    input.value = "";
                                }}
                                className="flex flex-row flex-shrink-0 justify-center bg-blue-500 hover:bg-blue-700 transition text-white text-base font-bold py-2 px-2 rounded soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
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
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <div>追加</div>
                            </button>
                        </div>
                        <div className="mb-4 mt-4 space-x-2">
                            {values.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`inline-flex items-center mb-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-lg ${
                                        index === 0 ? "ml-2" : ""
                                    }`}
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-7 h-7 text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* サブフォーム */}
            <div className="bg-white font-noto-sans-jp border rounded-md shadow-md p-4">
                <h3 className="font-bold text-2xl mb-4">投稿</h3>
                {values.sub_form_data.map((data, index) => (
                    <SubForm
                        key={data.id || index}
                        id={data.id}
                        index={index}
                        handleChange={handleChangeSubFormInput}
                        values={values}
                        setValues={setValues}
                        cancelImagePreview={cancelImagePreview}
                        cancelCancelImagePreview={cancelCancelImagePreview}
                    />
                ))}
                <div className="mb-4 flex justify-center">
                    <button
                        type="button"
                        className="mt-4 flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-700 transition text-white text-2xl font-semibold py-1 w-full rounded soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                        onClick={addSubForm}
                    >
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div>投稿を追加</div>
                    </button>
                </div>
            </div>

            {/* 記事の保存ボタン。記事投稿ページなら「投稿する」、記事編集ページなら「更新する」と表示する。*/}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="mt-4 bg-green-500 hover:bg-green-700 transition text-white text-4xl w-full font-noto-sans-jp font-bold py-2 px-4 rounded soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                    onClick={handleConfirmSubmit}
                >
                    {location.pathname === "/create" ? "投稿する" : "更新する"}
                </button>
            </div>
        </form>
    );
};

export default React.memo(MainForm);

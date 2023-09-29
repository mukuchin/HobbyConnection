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
}) => {
    // エラーを取得
    const { errors } = usePage().props;

    // サブフォームの追加・削除を行うカスタムフック
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 確認のアラートを表示する関数
    const handleConfirmSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const message =
            location.pathname === "/create"
                ? "記事を投稿しますか？"
                : "記事を更新しますか？";

        if (!window.confirm(message)) {
            e.preventDefault();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-md p-4">
                <h3 className="font-bold text-3xl mb-4">記事TOP</h3>
                {/* *についての説明。 */}
                <p className="mb-4">
                    <span className="text-red-500">*</span>は必須項目です。
                </p>
                {/* 画像のプレビュー */}
                <div className="flex">
                    <div className="w-1/2 pr-4">
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
                                    className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        cancelImagePreview(fileInputRef);
                                    }}
                                >
                                    画像を削除
                                </button>
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="delete_image"
                            value={values.delete_image ? "true" : "false"}
                        />

                        {/* 画像のアップロード。記事TOPの枠の下側に表示 */}
                        <div className="mb-4">
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
                                errors={errors}
                            />
                            {/* ファイル形式・サイズの注意書き */}
                            <p className=" text-gray-500">
                                画像は最大2MBまでです。ファイル形式はjpg, jpeg,
                                gif, pngに対応しています。
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2">
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
                            value={values.title}
                            onChange={handleChangeInput}
                            errors={errors}
                        />

                        <InputField
                            label="開始日"
                            type="date"
                            id="period_start"
                            name="period_start"
                            value={values.period_start}
                            onChange={handleChangeInput}
                            errors={errors}
                        />

                        <InputField
                            label="終了日"
                            type="date"
                            id="period_end"
                            name="period_end"
                            value={values.period_end}
                            onChange={handleChangeInput}
                            errors={errors}
                        />

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
                            value={values.description}
                            onChange={handleChangeInput}
                            errors={errors}
                            textareaHeight="h-48"
                        />

                        {/* タグ関連の部分 */}
                        <label
                            htmlFor="tag"
                            className="block text-xl font-medium text-gray-700"
                        >
                            タグ
                        </label>
                        <div className="w-full flex items-center space-x-4">
                            <input
                                type="text"
                                id="tag"
                                name="tags[]"
                                placeholder="タグを入力"
                                className="mt-1 p-2 border rounded flex-grow"
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
                                className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded"
                            >
                                タグを追加
                            </button>
                        </div>

                        <div className="mb-4 mt-4 space-x-2">
                            {values.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`inline-flex items-center mb-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xl ${
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

            <div className="border rounded-md p-4">
                <h3 className="font-bold text-3xl mb-4">投稿</h3>
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
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 w-full rounded"
                        onClick={addSubForm}
                    >
                        投稿を追加
                    </button>
                </div>
            </div>

            {/* 記事の保存ボタン。記事投稿ページなら「投稿する」、記事編集ページなら「更新する」と表示する。*/}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-4xl w-full font-bold py-2 px-4 rounded"
                    onClick={handleConfirmSubmit}
                >
                    {location.pathname === "/create" ? "投稿する" : "更新する"}
                </button>
            </div>
        </form>
    );
};

export default React.memo(MainForm);

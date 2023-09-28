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
}) => {
    // エラーを取得
    const { errors } = usePage().props;

    // サブフォームの追加・削除を行うカスタムフック
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-md p-4">
                <h3 className="font-bold text-3xl mb-4">記事TOP</h3>
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
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
                    </div>

                    <div className="w-1/2">
                        <InputField
                            label="タイトル"
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
                            label="概要"
                            type="textarea"
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChangeInput}
                            errors={errors}
                        />

                        {/* タグ関連の部分 */}
                        <div className="mb-4">
                            <label
                                htmlFor="tag"
                                className="block text-sm font-medium text-gray-700"
                            >
                                タグ
                            </label>
                            <input
                                type="text"
                                id="tag"
                                name="tags[]"
                                placeholder="タグを入力"
                                className="mt-1 p-2 border rounded"
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                タグを追加
                            </button>
                        </div>

                        <div className="mb-4 space-x-2">
                            {values.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                    >
                                        ❌
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
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addSubForm}
                    >
                        投稿を追加
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                記事を保存
            </button>
        </form>
    );
};

export default React.memo(MainForm);

// メインフォームのコンポーネント

import React, { useRef } from "react";
import { usePage } from "@inertiajs/react";
import { FormValues, useAddDeleteSubForm } from "../Hooks/useArticleForm";
import SubForm from "./SubForm";

// このコンポーネントで使用するpropsの型定義
interface MainFormProps {
    values: FormValues;
    handleChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
    handleChangeSubFormInput: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => void;
    cancelImagePreview: () => void;
}

// 入力フィールドをレンダリングするコンポーネント
const InputField = React.forwardRef<
    // このコンポーネントで使用するpropsの型定義
    HTMLInputElement | HTMLTextAreaElement,
    {
        label: string;
        type: string;
        id: string;
        name: string;
        value?: string | number;
        onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void;
        errors: { [key: string]: string };
    }
>((props, ref) => {
    const { label, type, id, name, value, onChange, errors } = props;
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            {type === "textarea" ? (
                // テキストエリアの場合
                <textarea
                    className="form-control"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : type === "file" ? (
                // ファイル入力の場合
                <input
                    type={type}
                    className="form-control"
                    id={id}
                    name={name}
                    ref={ref as React.Ref<HTMLInputElement>}
                    onChange={onChange}
                />
            ) : (
                // その他の場合
                <input
                    type={type}
                    className="form-control"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
        </div>
    );
});

// メインフォーム
const MainForm: React.FC<MainFormProps> = ({
    values,
    handleChangeInput,
    handleSubmit,
    setValues,
    handleChangeSubFormInput,
    cancelImagePreview,
}) => {
    const { errors } = usePage().props;
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    // ファイル入力の参照を作成
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isFullURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-3xl mb-4">記事TOP</h3>
            {/* タイトル */}
            <InputField
                label="タイトル"
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChangeInput}
                errors={errors}
            />
            {/*  開始日 */}
            <InputField
                label="開始日"
                type="date"
                id="period_start"
                name="period_start"
                value={values.period_start}
                onChange={handleChangeInput}
                errors={errors}
            />
            {/* 終了日 */}
            <InputField
                label="終了日"
                type="date"
                id="period_end"
                name="period_end"
                value={values.period_end}
                onChange={handleChangeInput}
                errors={errors}
            />
            {/* 概要 */}
            <InputField
                label="概要"
                type="textarea"
                id="description"
                name="description"
                value={values.description}
                onChange={handleChangeInput}
                errors={errors}
            />
            {/* 記事TOP画像のプレビュー */}
            {values.image && (
                <div className="mb-4">
                    <img
                        src={
                            isFullURL(values.image as string)
                                ? (values.image as string)
                                : `https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${values.image}`
                        }
                        alt="プレビュー画像"
                    />
                    {/* 記事TOP画像のプレビューをキャンセルするボタン */}
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                        onClick={() => {
                            cancelImagePreview();
                            // ファイル入力のvalueをリセット
                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                        }}
                    >
                        削除
                    </button>
                </div>
            )}

            {/* 記事TOP画像の削除フラグ */}
            <input
                type="hidden"
                name="delete_image"
                value={values.delete_image || ""}
            />
            {/* 記事TOP画像。
                記事投稿ページでは、"記事TOP画像"、記事編集ページでは、"記事TOP画像を変更する"と表示する。 */}
            <label htmlFor="image">
                {values.image ? "変更する記事TOP画像を選択" : "記事TOP画像"}
            </label>
            <InputField
                label=""
                type="file"
                id="image"
                name="image"
                onChange={handleChangeInput}
                errors={errors}
                ref={fileInputRef}
            />
            {/* 投稿（サブフォーム） */}
            <div className="p-6 text-gray-900">
                <h1 className="font-bold text-3xl mb-4">投稿</h1>
                {values.sub_form_data.map((data, index) => (
                    <SubForm
                        key={data.id || index}
                        data={data.comment}
                        id={data.id}
                        index={index}
                        handleChange={handleChangeSubFormInput}
                        values={values}
                        setValues={setValues}
                    />
                ))
                }
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={addSubForm}
                >
                    投稿を追加
                </button>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
                記事を保存
            </button>
        </form>
    );
};

export default MainForm;

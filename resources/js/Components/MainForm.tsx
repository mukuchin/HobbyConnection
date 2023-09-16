// メインフォームのコンポーネント

import React from "react";
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
}

// 入力フィールドをレンダリングするコンポーネント
const InputField: React.FC<{
    label: string;
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    errors: { [key: string]: string };
}> = ({ label, type, id, name, value, onChange, errors }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {type === "textarea" ? (
            <textarea
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            ></textarea>
        ) : (
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
        {/* エラーメッセージ */}
        {errors[name] && (
            <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
        )}
    </div>
);

// メインフォーム
const MainForm: React.FC<MainFormProps> = ({
    values,
    handleChangeInput,
    handleSubmit,
    setValues,
    handleChangeSubFormInput,
}) => {
    const { errors } = usePage().props;
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    return (
        <form onSubmit={handleSubmit}>
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
            {/* 記事TOP画像 */}
            <InputField
                label="記事TOP画像"
                type="file"
                id="image"
                name="image"
                value=""
                onChange={handleChangeInput}
                errors={errors}
            />
            {/* 投稿（サブフォーム） */}
            <div className="p-6 text-gray-900">
                <h1 className="font-bold text-3xl mb-4">投稿</h1>
                {values.sub_form_data.map((data, index) => (
                    <SubForm
                        key={index}
                        data={data}
                        index={index}
                        handleChange={handleChangeSubFormInput}
                        values={values}
                        setValues={setValues}
                    />
                ))}
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

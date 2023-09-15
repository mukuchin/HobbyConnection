// メインフォームコンポーネント

import React from "react";
import { usePage } from "@inertiajs/react";
import { FormValues, useAddDeleteSubForm } from "../Hooks/useArticleForm";
import SubForm from "./SubForm";

// このコンポーネントで使用するpropsの型定義
interface MainFormProps {
    values: {
        title: string;
        period_start: string;
        period_end: string;
        description: string;
        sub_form_data: string[];
    };
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

// メインフォーム
const MainForm: React.FC<MainFormProps> = ({
    values,
    handleChangeInput,
    handleSubmit,
    setValues,
    handleChangeSubFormInput,
}) => {
    // valuesを分割代入
    const { title, period_start, period_end, description } = values;

    // バリデーションエラーを取得
    const { errors } = usePage().props;

    // サブフォームの追加・削除を行うカスタムフック
    const { addSubForm } = useAddDeleteSubForm(values, setValues);

    return (
        <form onSubmit={handleSubmit}>
            {/* タイトル */}
            <div className="form-group">
                <label htmlFor="title">タイトル</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChangeInput}
                />
                {/* エラーメッセージ */}
                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>
            {/*  開始日 */}
            <div className="form-group">
                <label htmlFor="period_start">開始日</label>
                <input
                    type="date"
                    className="form-control"
                    id="period_start"
                    name="period_start"
                    value={period_start}
                    onChange={handleChangeInput}
                />
                {/* エラーメッセージ */}
                {errors.period_start && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.period_start}
                    </p>
                )}
            </div>
            {/* 終了日 */}
            <div className="form-group">
                <label htmlFor="period_end">終了日</label>
                <input
                    type="date"
                    className="form-control"
                    id="period_end"
                    name="period_end"
                    value={period_end}
                    onChange={handleChangeInput}
                />
                {/* エラーメッセージ */}
                {errors.period_end && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.period_end}
                    </p>
                )}
            </div>
            {/* 概要 */}
            <div className="form-group">
                <label htmlFor="description">概要</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={handleChangeInput}
                ></textarea>
                {/* エラーメッセージ */}
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                    </p>
                )}
            </div>
            {/* 記事TOP画像 */}
            <div className="form-group">
                <label htmlFor="image">記事TOP画像</label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                />
                {/* エラーメッセージ */}
                {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
            </div>
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

// メインフォームコンポーネント

import React from "react";
import { usePage } from "@inertiajs/react";

// このコンポーネントで使用するpropsの型定義
interface MainFormProps {
    values: {
        title: string;
        period_start: string;
        period_end: string;
        description: string;
        sub_form_data: string; // サブフォームのデータ
    };
    handleChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// メインフォーム
const MainForm: React.FC<MainFormProps> = ({
    values,
    handleChangeInput,
    handleSubmit,
}) => {
    // バリデーションエラーを取得
    const { errors } = usePage().props;

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
                    value={values.title}
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
                    value={values.period_start}
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
                    value={values.period_end}
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
                    value={values.description}
                    onChange={handleChangeInput}
                ></textarea>
                {/* エラーメッセージ */}
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                    </p>
                )}
            </div>
            {/* サブフォーム */}
            <div className="form-group">
                <label htmlFor="sub_form_data">サブフォーム</label>
                <input
                    type="text"
                    className="form-control"
                    id="sub_form_data"
                    name="sub_form_data"
                    value={values.sub_form_data}
                    onChange={handleChangeInput}
                />
                {/* エラーメッセージ */}
                {errors.sub_form_data && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.sub_form_data}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
                保存
            </button>
        </form>
    );
};

export default MainForm;

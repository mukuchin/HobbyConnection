// サブフォームコンポーネント

import React from "react";
import { FormValues, useAddDeleteSubForm } from "@/Hooks/useArticleForm";

// このコンポーネントで使用するpropsの型定義
interface SubFormProps {
    data: string;
    index: number;
    handleChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => void;
    values: {
        title: string;
        period_start: string;
        period_end: string;
        description: string;
        sub_form_data: string[];
    };
    setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

// サブフォーム
const SubForm: React.FC<SubFormProps> = ({
    data,
    index,
    handleChange,
    values,
    setValues,
}) => {
    // サブフォームの追加・削除を行うカスタムフック
    const { deleteSubForm } = useAddDeleteSubForm(values, setValues);

    return (
        <div className="form-group">
            <label htmlFor={`sub_form_data_${index}`}>投稿 {index + 1}</label>
            <textarea
                className="form-control"
                id={`sub_form_data_${index}`}
                name={`sub_form_data_${index}`}
                value={data}
                onChange={(e) => handleChange(e, index)}
            ></textarea>
            {/* サブフォームの削除ボタン */}
            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteSubForm(index)}
            >
                削除
            </button>
        </div>
    );
};

export default SubForm;

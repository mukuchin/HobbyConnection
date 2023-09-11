// サブフォームコンポーネント

import React from "react";

// このコンポーネントで使用するpropsの型定義
interface SubFormProps {
    data: string;
    index: number;
    handleChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => void;
}

// サブフォーム
const SubForm: React.FC<SubFormProps> = ({ data, index, handleChange }) => {
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
        </div>
    );
};

export default SubForm;

// サブフォームコンポーネント
// フォームのサブセクションを表すコンポーネント

import React, { useState } from "react";

// このコンポーネントで使用するpropsの型定義
interface SubFormProps {
    values: {
        comment: string;
    };
    handleChangeInput: (name: string, value: string) => void;
}

// サブフォーム
const SubForm: React.FC<SubFormProps> = ({ values, handleChangeInput }) => {
    return (
        <form>
            {/* コメント */}
            <div className="form-group">
                <label htmlFor="comment">コメント</label>
                <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    value={values.comment}
                    onChange={(e) =>
                        handleChangeInput(e.target.name, e.target.value)
                    }
                ></textarea>
            </div>
        </form>
    );
};

export default SubForm;

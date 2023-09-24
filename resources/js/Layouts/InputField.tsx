import React from "react";

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
        errors: any;
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

export default InputField;

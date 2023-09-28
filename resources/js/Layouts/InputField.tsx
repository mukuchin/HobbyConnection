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
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    className="form-control mt-1 p-2 border rounded"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : type === "file" ? (
                <input
                    type={type}
                    className="form-control mt-1 p-2 border rounded"
                    id={id}
                    name={name}
                    ref={ref as React.Ref<HTMLInputElement>}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className="form-control mt-1 p-2 border rounded"
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

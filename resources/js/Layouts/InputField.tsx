import React from "react";

// 入力フィールドをレンダリングするコンポーネント
const InputField = React.forwardRef<
    // このコンポーネントで使用するpropsの型定義
    HTMLInputElement | HTMLTextAreaElement,
    {
        label: string | JSX.Element;
        type: string;
        id: string;
        name: string;
        value?: string | number;
        onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void;
        errors: any;
        textareaHeight?: string;
    }
>((props, ref) => {
    const { label, type, id, name, value, onChange, errors, textareaHeight } =
        props;
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-lg font-medium text-gray-700"
            >
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    className={`form-control mt-1 p-2 w-full border rounded ${
                        textareaHeight || "h-48"
                    }`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : type === "file" ? (
                <input
                    type={type}
                    className="form-control mt-1 p-2 w-full border rounded"
                    id={id}
                    name={name}
                    ref={ref as React.Ref<HTMLInputElement>}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className="form-control mt-1 p-2 w-full border rounded"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
            {errors[name] && (
                <p className="text-red-500 text-lg mt-1">{errors[name]}</p>
            )}
        </div>
    );
});

export default InputField;

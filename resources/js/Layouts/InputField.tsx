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
        textareaHeight?: string;
        placeholder?: string;
    }
>((props, ref) => {
    const {
        label,
        type,
        id,
        name,
        value,
        onChange,
        textareaHeight,
        placeholder,
    } = props;

    // Enterキーの押下を検出してイベントをキャンセルする関数
    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    return (
        <div className="w-full flex flex-col">
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
                    placeholder={placeholder}
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
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <input
                    type={type}
                    className="form-control mt-1 p-2 w-full border rounded"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
    );
});

export default InputField;

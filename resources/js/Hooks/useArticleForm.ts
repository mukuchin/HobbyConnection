import { ChangeEvent, FormEvent, useCallback } from "react";
import { router } from "@inertiajs/react";

// フォームの入力値の型
export interface FormValues {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image?: string | ArrayBuffer | null;
    sub_form_data: {
        id?: number;
        comment: string;
        image?: string | ArrayBuffer | null;
    }[];
    delete_image?: string;
}

interface MainFormHook {
    handleChangeInput: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleChangeSubFormInput: (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    cancelImagePreview: () => void;
}

interface SubFormHook {
    addSubForm: () => void;
    deleteSubForm: (index: number) => void;
}

const allowedExtensions = ["jpg", "jpeg", "gif", "png"];

const isValidFileExtension = (filename: string) => {
    const fileExtension = filename.split(".").pop()?.toLowerCase();
    return fileExtension && allowedExtensions.includes(fileExtension);
};

export function useArticleForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>,
    endpoint: string
): MainFormHook {
    const updateValues = (updatedValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...updatedValues }));
    };

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file || !isValidFileExtension(file.name)) {
            alert(
                "無効なファイル形式です。jpg, gif, pngのみ許可されています。"
            );
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const target = event.target as FileReader;
            if (typeof target.result === "string") {
                if (typeof index === "number") {
                    const newSubFormData = [...values.sub_form_data];
                    newSubFormData[index] = {
                        ...newSubFormData[index],
                        image: target.result,
                    };
                    updateValues({ sub_form_data: newSubFormData });
                } else {
                    updateValues({ image: target.result });
                }
            }
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("sub_form_data") && typeof index === "number") {
            const fieldName = name.split("][")[1].replace("]", "");
            if (fieldName === "comment") {
                const newSubFormData = [...values.sub_form_data];
                newSubFormData[index].comment = value;
                setValues((prev) => ({
                    ...prev,
                    sub_form_data: newSubFormData,
                }));
            } else if (fieldName === "image") {
                handleImageChange(e, index);
            }
        } else if (name === "image") {
            handleImageChange(e);
        } else {
            updateValues({ [name]: value });
        }
    };

    const cancelImagePreview = useCallback(() => {
        updateValues({ image: null, delete_image: "true" });
    }, [updateValues]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(endpoint, formData, {
            onBefore: (visit) => {
                visit.headers["Content-Type"] = "multipart/form-data";
            },
        });
    };

    return {
        handleChangeInput: handleChange,
        handleChangeSubFormInput: handleChange,
        handleSubmit,
        cancelImagePreview,
    };
}

export function useAddDeleteSubForm(
    values: FormValues,
    setValues: React.Dispatch<React.SetStateAction<FormValues>>
): SubFormHook {
    const updateValues = (updatedValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...updatedValues }));
    };

    const addSubForm = useCallback(() => {
        const newSubFormData = [
            ...values.sub_form_data,
            { comment: "", image: null },
        ];
        updateValues({ sub_form_data: newSubFormData });
    }, [values, updateValues]);

    const deleteSubForm = useCallback(
        (index: number) => {
            const newSubFormData = values.sub_form_data.filter(
                (_, i) => i !== index
            );
            updateValues({ sub_form_data: newSubFormData });
        },
        [values, updateValues]
    );

    return { addSubForm, deleteSubForm };
}

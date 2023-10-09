// 記事編集ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useArticleForm, FormValues } from "@/Hooks/useArticleForm";
import { ArticleItems } from "@/types/ArticleProps";
import { useFormatDate } from "@/Hooks/useFormatDate";

// Propsの型定義
interface EditProps extends PageProps {
    article: ArticleItems;
}

export default function edit({ auth, article }: EditProps) {
    // 記事の値を取得
    const {
        id,
        title,
        period_start,
        period_end,
        description,
        sub_form_data,
        image_top,
        created_at,
        updated_at,
        tags,
    } = article;

    // 各値の設定。初期値は、記事の値。
    const [values, setValues] = useState<FormValues>({
        title,
        period_start,
        period_end,
        description,
        image: image_top,
        sub_form_data: sub_form_data.map((data) => ({
            id: data.id,
            comment: data.comment,
            image: data.image,
        })),
        tags: tags,
        delete_image: false,
    });

    // カスタムフック
    const {
        handleChangeInput,
        handleSubmit,
        handleChangeSubFormInput,
        cancelImagePreview,
        cancelCancelImagePreview,
        addTag,
        removeTag,
    } = useArticleForm(values, setValues, `/posts/${id}`);

    // 日付をフォーマットする関数
    const formatDate = useFormatDate();

    return (
        <>
            <AppHead title="記事編集" />
            <AuthenticatedLayout user={auth.user} />
            <div className="bg-fixed bg-various-hobby py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 font-noto-sans-jp text-gray-900">
                        <h1 className="font-bold text-3xl mb-4">記事編集</h1>
                        <p className="mb-4">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="ml-2">
                                    {formatDate(created_at)}
                                </span>
                            </div>
                        </p>
                        <p className="mb-4">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                <span className="ml-2">
                                    {formatDate(updated_at)}
                                </span>
                            </div>
                        </p>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <MainForm
                                        values={values}
                                        handleChangeInput={handleChangeInput}
                                        handleSubmit={handleSubmit}
                                        setValues={setValues}
                                        handleChangeSubFormInput={
                                            handleChangeSubFormInput
                                        }
                                        cancelImagePreview={cancelImagePreview}
                                        cancelCancelImagePreview={
                                            cancelCancelImagePreview
                                        }
                                        addTag={addTag}
                                        removeTag={removeTag}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

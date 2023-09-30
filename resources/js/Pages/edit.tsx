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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-4xl mb-4">
                                記事編集
                            </h1>
                            <p className="mb-4">
                                作成日時：{formatDate(created_at)}
                            </p>
                            <p className="mb-4">
                                更新日時：{formatDate(updated_at)}
                            </p>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <MainForm
                                            values={values}
                                            handleChangeInput={
                                                handleChangeInput
                                            }
                                            handleSubmit={handleSubmit}
                                            setValues={setValues}
                                            handleChangeSubFormInput={
                                                handleChangeSubFormInput
                                            }
                                            cancelImagePreview={
                                                cancelImagePreview
                                            }
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
            </div>
        </>
    );
}

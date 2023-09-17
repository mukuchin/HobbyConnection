// 記事編集ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useArticleForm, FormValues } from "@/Hooks/useArticleForm";
import { ArticleItems } from "@/types/ArticleProps";

// Propsの型定義
interface EditProps extends PageProps {
    article: ArticleItems;
}

export default function edit({ auth, article }: EditProps) {
    const {
        id,
        title,
        period_start,
        period_end,
        description,
        sub_form_data,
        image_top,
    } = article;

    // 各値の設定。初期値は、記事投稿ページから渡された値
    const [values, setValues] = useState<FormValues>({
        title,
        period_start,
        period_end,
        description,
        image: `https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`,
        sub_form_data: sub_form_data || [""],
    });

    // カスタムフック
    const {
        handleChangeInput,
        handleSubmit,
        handleChangeSubFormInput,
        cancelImagePreview,
    } = useArticleForm(values, setValues, `/posts/${id}`);

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事編集" />

            {/* ナビゲーションバー */}
            <AuthenticatedLayout user={auth.user} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                記事編集
                            </h1>

                            {/* フォーム */}
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

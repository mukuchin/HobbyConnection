// 記事投稿ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useArticleForm, FormValues } from "@/Hooks/useArticleForm";

export default function create({ auth }: PageProps) {
    // 各値の初期値は、空文字列
    const [values, setValues] = useState<FormValues>({
        title: "",
        period_start: "",
        period_end: "",
        description: "",
        sub_form_data: [{ comment: "" }],
        tags: [],
        delete_image: false,
    });

    // カスタムフック
    const {
        handleChangeInput,
        handleSubmit,
        handleChangeSubFormInput,
        cancelImagePreview,
        cancelCancelImagePreview,
    } = useArticleForm(values, setValues, "/posts");

    return (
        <>
            <AppHead title="記事投稿" />
            <AuthenticatedLayout user={auth.user} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                記事投稿
                            </h1>
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

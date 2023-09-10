// 記事投稿ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useMainForm } from "@/Hooks/useMainForm";

export default function create({ auth }: PageProps) {
    // 各値の初期値は、空文字列
    const [values, setValues] = useState({
        title: "",
        period_start: "",
        period_end: "",
        description: "",
        sub_form_data: [""], // サブフォームのデータを配列として管理
    });

    // カスタムフック
    const { handleChangeInput, handleSubmit, handleChangeSubFormInput } =
        useMainForm(values, setValues, "/posts");

    return (
        <>
            {/*  ページ名・タブ名表示 */}
            <AppHead title="記事投稿" />

            {/* ナビゲーションバー */}
            <AuthenticatedLayout user={auth.user} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                記事投稿
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

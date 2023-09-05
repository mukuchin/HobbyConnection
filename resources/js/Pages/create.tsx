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
    });

    // カスタムフック
    const { handleChangeInput, handleChangeTextarea, handleSubmit } =
        useMainForm(values, setValues, "/posts");

    return (
        <>
            {/*  ページ名・タブ名表示 */}
            <AppHead title="記事投稿" />

            {/* ナビゲーションバー */}
            <AuthenticatedLayout user={auth.user} />

            {/* フォーム */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <MainForm
                            values={values}
                            handleChangeInput={handleChangeInput}
                            handleChangeTextarea={handleChangeTextarea}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

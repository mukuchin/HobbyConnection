// 記事編集ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useMainForm } from "@/Hooks/useMainForm";
import { ArticleItems } from "@/types/ArticleProps";

// Propsの型定義
interface EditProps extends PageProps {
    article: ArticleItems;
}

export default function edit({ auth, article }: EditProps) {
    const { id, title, period_start, period_end, description } = article;

    // 各値の設定。初期値は、記事投稿ページから渡された値
    const [values, setValues] = useState({
        title,
        period_start,
        period_end,
        description,
    });

    // カスタムフック
    const { handleChangeInput, handleChangeTextarea, handleSubmit } =
        useMainForm(values, setValues, `/posts/${id}`);

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事編集" />

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
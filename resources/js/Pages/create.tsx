// 記事作成ページ

import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";

export default function create({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    const [values, setValues] = useState({
        title: "",
        period_start: "",
        period_end: "",
        description: "",
    });

    // タイトル・開始日・終了日の入力値を取得
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // 内容の入力値を取得
    const handleChangeTextarea = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // 送信ボタン押下時の処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post("/posts", values);
    };

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事作成" />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}

            {/* 記事投稿フォーム */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">タイトル</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="period_start">開始日</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="period_start"
                                    name="period_start"
                                    value={values.period_start}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="period_end">終了日</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="period_end"
                                    name="period_end"
                                    value={values.period_end}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">内容</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChangeTextarea}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                送信
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

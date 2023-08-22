// 記事投稿ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import { useMainForm } from "@/Hooks/useMainForm";

export default function create({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    // 各値の設定
    const [values, setValues] = useState({
        title: "",
        period_start: "",
        period_end: "",
        description: "",
    });

    // カスタムフック
    const { handleChangeInput, handleChangeTextarea, handleSubmit } =
        useMainForm(values, setValues);

    return (
        <>
            <AppHead title="記事投稿" />
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}
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

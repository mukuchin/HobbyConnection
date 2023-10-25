// 記事投稿ページ

import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import MainForm from "@/Components/MainForm";
import { PageProps } from "@/types";
import {
    useUnifiedArticleForm,
    FormValues,
} from "@/Hooks/useUnifiedArticleForm";
import SessionTimer from "@/Components/SessionTimer";
import { useWarnOnExit } from "@/Hooks/useWarnOnExit";
import FooterComponent from "@/Components/FooterComponent";
import NProgress from "nprogress";

export default function create({ auth }: PageProps) {
    // 各値の初期値は、空文字列
    const [values, setValues] = useState<FormValues>({
        title: "",
        period_start: "",
        period_end: "",
        description: "",
        sub_form_data: [
            {
                heading: "",
                comment: "",
            },
        ],
        tags: [],
        delete_image: false,
    });

    // ページの再読込や遷移時に警告を表示
    useWarnOnExit(values);

    // NProgress イベントリスナーの追加
    NProgress.configure({
        showSpinner: true,
        minimum: 0.1,
        positionUsing: "translate3d",
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
        handleConfirmSubmit,
        addSubForm,
        deleteSubForm,
        isUploading,
    } = useUnifiedArticleForm(values, setValues, "/posts");

    return (
        <>
            <AppHead title="記事投稿" />
            <AuthenticatedLayout user={auth.user} />
            <div className="bg-fixed bg-various-hobby py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2 sm:p-6 text-gray-900">
                        <h1 className="font-noto-sans-jp font-bold text-3xl mb-4 p-2 sm:p-0">
                            記事投稿
                        </h1>
                        <SessionTimer />
                        <div className="ml-4 mb-4 text-xs text-gray-500 font-noto-sans-jp">
                            <ul
                                style={{
                                    listStylePosition: "outside",
                                    listStyleType: "disc",
                                }}
                            >
                                <li>
                                    残り時間が無くなると、入力内容がリセットされます。
                                </li>
                                <li>
                                    ページの再読込みや別のページへの遷移をすると、入力内容がリセットされます。
                                </li>
                            </ul>
                        </div>
                        <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                handleConfirmSubmit={handleConfirmSubmit}
                                addSubForm={addSubForm}
                                deleteSubForm={deleteSubForm}
                            />
                        </div>
                        {/* 投稿中のスピナー */}
                        {isUploading && (
                            <div className="fixed top-0 left-0 w-full h-full flex flex-row items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="custom-spinner"></div>
                                <div className="ml-8 text-white text-2xl">
                                    投稿中・・・
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <FooterComponent />
            </div>
        </>
    );
}

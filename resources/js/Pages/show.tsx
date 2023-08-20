// 記事閲覧ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";

export default function show(props: any, { auth }: PageProps) {
    // props.post には、記事の情報が入っている。型が不明なので、any で受け取る。
    const isLoggedIn = auth && auth.user !== null;
    const { title, period_start, period_end, description } = props.article;

    console.log(props.article);

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事" />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}

            {/* 記事の閲覧 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">{title}</h1>
                            <p className="mb-4">
                                <span className="mr-4">
                                    {period_start} 〜 {period_end}
                                </span>
                                {/* 概要 */}
                                <p className="mb-4">{description}</p>
                                {/* 本文 */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// TOPページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";

export default function top({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    return (
        <>
            {/* ページ名・タブ名表示。TOPページはタブ名は表示しない。 */}
            <AppHead />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}

            {/* 投稿された記事の一覧を表示 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* 投稿された記事の一覧を表示 */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                記事一覧
                            </h1>
                            <div className="flex flex-wrap">
                                {/* 記事の一覧を表示 */}
                                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                                    <div className="bg-white rounded-lg shadow-md">
                                        <div className="p-6">
                                            <h2 className="font-bold text-2xl mb-4">
                                                記事のタイトル
                                            </h2>
                                            <p className="mb-4">記事の概要</p>
                                            <div className="flex justify-end">
                                                <a
                                                    href="#"
                                                    className="text-sm text-gray-500"
                                                >
                                                    記事を読む
                                                </a>
                                            </div>
                                        </div>
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

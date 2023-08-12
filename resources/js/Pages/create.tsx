// 記事作成ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";

export default function create({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事作成" />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user}></AuthenticatedLayout>
            ) : (
                <GuestLayout></GuestLayout>
            )}

            {/* 記事の入力フォーム */}
            <form action="/posts" method="POST">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {/* タイトル */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        タイトル（100文字まで）
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="タイトル"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                {/* 開始日時 */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="started_at"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        開始日時
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="started_at"
                                        id="started_at"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                {/* 終了日時 */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="ended_at"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        終了日時
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="ended_at"
                                        id="ended_at"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                {/* 記事の概要 */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        記事の概要（1000文字まで）
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="記事の概要"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    ></textarea>
                                </div>
                                {/* 送信ボタン */}
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        送信
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

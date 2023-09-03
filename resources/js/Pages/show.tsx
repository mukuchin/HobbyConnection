// 記事閲覧ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";
import { ArticleItems, ArticleUser } from "@/types/ArticleProps";

// Propsの型定義
interface ShowProps extends PageProps {
    article: ArticleItems;
    article_user: ArticleUser;
}

export default function show({ auth, article, article_user }: ShowProps) {
    const isLoggedIn = auth && auth.user !== null;
    const { title, period_start, period_end, description } = article;
    const { name } = article_user;

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
                            {/* タイトル */}
                            <h1 className="font-bold text-3xl mb-4">{title}</h1>
                            {/* ユーザー名 */}
                            <p className="mb-4">投稿者：{name}</p>
                            {/* 期間 */}
                            <p className="mb-4">
                                {period_start} 〜 {period_end}
                            </p>
                            {/* 概要 */}
                            <p className="mb-4">{description}</p>
                            {/* TOPページに戻る */}
                            <a
                                href="/"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                TOPページに戻る
                            </a>
                            {/* マイページに戻る */}
                            <a
                                href="/mypage"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                マイページに戻る
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

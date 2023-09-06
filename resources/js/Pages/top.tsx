// TOPページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import ArticleList from "@/Components/ArticleList";
import { PageProps } from "@/types";
import { ArticleItems, ArticleUser } from "@/types/ArticleProps";

// Propsの型定義
interface TopProps extends PageProps {
    article: ArticleItems[];
}
export default function top({ auth, article }: TopProps) {
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                記事一覧
                            </h1>
                            {[...article].reverse().map((item) => (
                                <ArticleList key={item.id} article={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

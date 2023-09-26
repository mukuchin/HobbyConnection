// TOPページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import ArticleList from "@/Components/ArticleList";
import { PageProps } from "@/types";
import { ArticleItems } from "@/types/ArticleProps";
import Pagination from "@/Components/Pagination";

// Propsの型定義
interface TopProps extends PageProps {
    article: {
        current_page: number;
        last_page: number;
        data: ArticleItems[];
    };
}

export default function top({ auth, article }: TopProps) {
    const isLoggedIn = auth.user !== null;
    const { current_page, last_page, data } = article;

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
                                全ての記事
                            </h1>
                            {data.map((item) => (
                                <ArticleList
                                    key={item.id}
                                    article={item}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                        </div>
                        {/* ペジネーション */}
                        <Pagination
                            auth={auth}
                            page={current_page}
                            lastPage={last_page}
                            baseUrl="/"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

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
        total: number;
        per_page: number;
        data: ArticleItems[];
    };
}

export default function top({ auth, article }: TopProps) {
    const isLoggedIn = auth.user !== null;
    const { current_page, last_page, data } = article;

    return (
        <>
            <AppHead />
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}
            {/* ホビーコネクションの紹介 */}
            <div className="bg-black">
                <div className="bg-top bg-cover bg-no-repeat bg-center p-6 py-64 shadow-md text-white">
                    <h1 className="font-bold text-4xl sm:text-5xl mb-6 text-center">
                        人生に新しいワクワクを。
                    </h1>
                    <div className="flex justify-center">
                        <div className="flex flex-col text-left text-sm sm:text-base">
                            <div className="mb-4 flex flex-col sm:flex-row">
                                <span>
                                    Hobby
                                    Connection（ホビーコネクション）は、趣味を通じて人と人を
                                </span>
                                <span>つなぐサービスです。</span>
                            </div>
                            <div className="mb-4">
                                あなたの趣味を投稿して、同じ趣味、異なる趣味の人を探してみましょう。
                            </div>
                            <div className="mb-6">
                                あなたの楽しみが、ここから広がります。
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-xl sm:text-3xl">
                        <a
                            href="/create"
                            className="inline-block mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300"
                        >
                            記事を投稿する
                        </a>
                        {/* ログインしていないときはユーザー新規登録ボタンを表示する。 */}
                        {!isLoggedIn && (
                            <a
                                href="/register"
                                className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300"
                            >
                                新規ユーザー登録
                            </a>
                        )}
                    </div>
                </div>
            </div>
            {/* 記事一覧 */}

            <div className="bg-fixed bg-various-hobby py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-2xl mb-4">
                                全ての記事
                            </h1>
                            {data.map((item) => (
                                <ArticleList
                                    key={item.id}
                                    article={item}
                                    isLoggedIn={isLoggedIn}
                                />
                            ))}
                            <Pagination
                                auth={auth}
                                page={current_page}
                                lastPage={last_page}
                                baseUrl="/"
                                paginationInfo={{
                                    total: article.total,
                                    perPage: article.per_page,
                                    currentPage: article.current_page,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

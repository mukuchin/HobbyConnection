// TOPページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import ArticleList from "@/Components/ArticleList";
import { PageProps } from "@/types";
import { ArticleItems } from "@/types/ArticleProps";
import Pagination from "@/Components/Pagination";
import { useEffect } from "react";

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

    // ページ遷移時にスクロール位置を調整する
    useEffect(() => {
        if (sessionStorage.getItem("paginationTransition") === "true") {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 380) {
                window.scrollTo(0, 850);
            } else {
                window.scrollTo(0, 1250);
            }
            sessionStorage.removeItem("paginationTransition");
        }
    }, []);

    return (
        <>
            <AppHead />
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}
            {/* ホビーコネクションの紹介 */}
            <div className="bg-top bg-cover bg-no-repeat bg-center py-32 sm:py-64 shadow-md text-white">
                <div className="mb-16 sm:mb-32 flex flex-col sm:flex-row justify-center font-noto-sans-jp font-medium text-4xl sm:text-5xl animate-text-focus-in0 text-center">
                    <div>人生に新しい</div>
                    <div>ワクワクを。</div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col px-4 text-left text-xs md:text-base font-noto-sans-jp">
                        <div className="mb-4 animate-text-focus-in1">
                            Hobby
                            Connection（ホビーコネクション）は、趣味を通じて人と人をつなぐサービスです。
                        </div>
                        <div className="mb-4 animate-text-focus-in2">
                            あなたの趣味を投稿して、同じ趣味や異なる趣味の記事を探してみましょう。
                        </div>
                        <div className="mb-6 animate-text-focus-in3">
                            あなたの楽しみが、ここから広がります。
                        </div>
                    </div>
                </div>
                <div className="mt-24 sm:mt-48 flex flex-col md:flex-row justify-center items-center font-noto-sans-jp font-semibold text-2xl animate-text-focus-in4">
                    <a
                        href="/create"
                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-6 w-60 rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                    >
                        記事を投稿する
                    </a>
                    {/* ログインしていないときはユーザー新規登録ボタンを表示する。 */}
                    {!isLoggedIn && (
                        <a
                            href="/register"
                            className="mt-4 md:ml-4 inline-block bg-green-500 hover:bg-green-700 text-white text-center py-2 px-6 w-60 rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                        >
                            新規ユーザー登録
                        </a>
                    )}
                </div>
            </div>
            {/* 記事一覧 */}

            <div className="bg-fixed bg-various-hobby py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2 text-gray-900">
                        <h1 className="font-noto-sans-jp font-bold text-2xl sm:text-3xl mb-4 p-2 sm:p-0">
                            全ての記事
                        </h1>
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
        </>
    );
}

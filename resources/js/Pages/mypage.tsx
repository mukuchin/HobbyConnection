// マイページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppHead from "../Layouts/AppHead";
import ArticleList from "@/Components/ArticleList";
import { PageProps } from "@/types";
import { ArticleItems } from "@/types/ArticleProps";
import Pagination from "@/Components/Pagination";

// Propsの型定義
interface MyPageProps extends PageProps {
    article: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        data: ArticleItems[];
    };
}

export default function mypage({ auth, article }: MyPageProps) {
    const { current_page, last_page, data } = article;

    return (
        <>
            <AppHead title="マイページ" />
            <AuthenticatedLayout user={auth.user} />
            <div className="bg-fixed bg-various-hobby py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-noto-sans-jp font-bold text-3xl mb-4">
                                マイページ
                            </h1>
                            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h1 className="font-noto-sans-jp font-bold  text-2xl mb-4">
                                        プロフィール
                                    </h1>
                                    <p className="font-noto-sans-jp text-lg mb-4">
                                        名前：{auth.user.name}
                                    </p>
                                    <p className="font-noto-sans-jp text-lg mb-4">
                                        メールアドレス：{auth.user.email}
                                    </p>
                                    <a href="/profile">
                                        <button
                                            type="button"
                                            className="font-noto-sans-jp font-semibold bg-blue-500 hover:bg-blue-700 text-white text-lg py-2 px-4 rounded"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        </button>
                                    </a>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <h1 className="font-noto-sans-jp font-semibold text-2xl mb-4">
                                        投稿した記事
                                    </h1>
                                    {data.map((item) => (
                                        <ArticleList
                                            key={item.id}
                                            article={item}
                                            isMyPage={true}
                                            isLoggedIn={true}
                                        />
                                    ))}
                                    <Pagination
                                        auth={auth}
                                        page={current_page}
                                        lastPage={last_page}
                                        baseUrl="/mypage"
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
                </div>
            </div>
        </>
    );
}

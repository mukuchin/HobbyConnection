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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                マイページ
                            </h1>
                            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h1 className="font-bold text-2xl mb-4">
                                        プロフィール
                                    </h1>
                                    <p className="text-lg mb-4">
                                        名前：{auth.user.name}
                                    </p>
                                    <p className="text-lg mb-4">
                                        メールアドレス：{auth.user.email}
                                    </p>
                                    <a
                                        href="/profile"
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded"
                                    >
                                        プロフィールを編集する
                                    </a>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <h1 className="font-bold text-2xl mb-4">
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

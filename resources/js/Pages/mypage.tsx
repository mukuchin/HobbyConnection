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
        data: ArticleItems[];
    };
}

export default function mypage({ auth, article }: MyPageProps) {
    const { current_page, last_page, data } = article;

    console.log(article);
    console.log(current_page);
    console.log(last_page);
    console.log(data);

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="マイページ" />

            {/* ナビゲーションバー */}
            <AuthenticatedLayout user={auth.user} />

            {/* プロフィールを表示 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                プロフィール
                            </h1>
                            <p className="mb-4">名前：{auth.user.name}</p>
                            <p className="mb-4">
                                メールアドレス：{auth.user.email}
                            </p>
                            {/* プロフィール編集ページへのリンク */}
                            <a
                                href="/profile"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                プロフィールを編集する
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* 自分が投稿した記事の一覧 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl mb-4">
                                投稿した記事
                            </h1>
                            {/* 投稿された記事の一覧を新しく投稿された順に表示 */}
                            {data.map((item) => (
                                <ArticleList
                                    key={item.id}
                                    article={item}
                                    isMyPage={true}
                                />
                            ))}
                        </div>
                        {/* ペジネーション */}
                        <Pagination
                            auth={auth}
                            page={current_page}
                            lastPage={last_page}
                            baseUrl="/mypage"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

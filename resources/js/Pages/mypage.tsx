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

    return (
        <>
            <AppHead title="マイページ" />
            <AuthenticatedLayout user={auth.user} />
            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h1 className="font-bold text-4xl mb-4">プロフィール</h1>
                    <p className="mb-4">名前：{auth.user.name}</p>
                    <p className="mb-4">メールアドレス：{auth.user.email}</p>
                    <a
                        href="/profile"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        プロフィールを編集する
                    </a>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h1 className="font-bold text-4xl mb-4">投稿した記事</h1>
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
                    />
                </div>
            </div>
        </>
    );
}

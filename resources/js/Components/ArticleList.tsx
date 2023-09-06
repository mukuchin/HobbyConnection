// 記事を一覧表示するコンポーネント

import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { ArticleItems } from "@/types/ArticleProps";

// このコンポーネントで使用するpropsの型定義
interface ArticleListProps {
    article: ArticleItems;
    isMyPage?: boolean;
}

// 記事一覧を表示するコンポーネント
const ArticleList: React.FC<ArticleListProps> = ({
    article,
    isMyPage,
}: ArticleListProps) => {
    const { id, title, period_start, period_end, description, user } = article;
    const { name } = user;
    const { delete: destroy } = useForm();

    /// 削除ボタンを押したときに、確認メッセージを表示する
    const confirmDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm("一度削除した記事は元に戻せません。本当に削除しますか？")) {
            handleDelete();
        }
    };

    // 削除ボタンがクリックされたときの処理
    const handleDelete = () => {
        // 削除処理
        destroy(`/posts/${id}`);
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="mb-4">
                            <Link
                                href={`/posts/${id}`}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                {title}
                            </Link>
                            <p className="text-sm">投稿者：{name}</p>
                            <p className="text-sm">
                                期間：{period_start} 〜 {period_end}
                            </p>
                            <p className="text-sm">概要：{description}</p>
                        </div>
                        {/* マイページで使用する際は、編集ボタンと削除ボタンを表示する。 */}
                        {isMyPage && (
                            <div className="flex">
                                <Link
                                    href={`/posts/${id}/edit`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                                >
                                    編集
                                </Link>
                                <form
                                    action={`/posts/${id}`}
                                    method="post"
                                    onSubmit={confirmDelete}
                                >
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        削除
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleList;

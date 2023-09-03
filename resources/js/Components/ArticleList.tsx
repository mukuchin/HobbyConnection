// 記事を一覧表示するコンポーネント

import React from "react";
import { Link } from "@inertiajs/react";
import { ArticleItems } from "@/types/ArticleProps";

// このコンポーネントで使用するpropsの型定義
interface ArticleListProps {
    article: ArticleItems;
}

// 記事一覧を表示するコンポーネント
const ArticleList: React.FC<ArticleListProps> = ({ article }) => {
    const { id, title, period_start, period_end, description, user } = article;
    const { name } = user;

    console.log(article);

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleList;

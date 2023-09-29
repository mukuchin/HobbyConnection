// 記事を一覧表示するコンポーネント

import React from "react";
import { Link } from "@inertiajs/react";
import { ArticleItems } from "@/types/ArticleProps";
import { useDeleteMyArticle } from "@/Hooks/useDeleteMyArticle";
import LikeButton from "./LikeButton";
import useFormatDate from "@/Hooks/useFormatDate";

// このコンポーネントで使用するpropsの型定義
interface ArticleListProps {
    article: ArticleItems;
    isMyPage?: boolean;
    isLoggedIn: boolean;
}

// 記事一覧を表示するコンポーネント
const ArticleList: React.FC<ArticleListProps> = ({
    article,
    isMyPage,
    isLoggedIn,
}: ArticleListProps) => {
    const {
        id,
        title,
        description,
        image_top,
        user,
        created_at,
        updated_at,
        tags,
    } = article;
    const { name } = user;
    const { confirmDelete } = useDeleteMyArticle(id);

    const formatDate = useFormatDate();

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        <Link
                            href={`/posts/${id}`}
                            className="text-blue-500 hover:text-blue-600 text-3xl font-semibold"
                        >
                            {title}
                        </Link>
                        <div className="text-xl text-gray-600 mt-2">
                            <span>投稿者：{name}</span>
                            <span className="ml-4">
                                作成日時：{formatDate(created_at)}
                            </span>
                            <span className="ml-4">
                                更新日時：{formatDate(updated_at)}
                            </span>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">
                            {description}
                        </p>
                        <div className="flex flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xl"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {image_top && (
                            <img
                                src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                alt="TOP画像"
                                className="mt-4 w-full h-56 object-cover rounded-md"
                            />
                        )}
                        <div className="mt-4 flex justify-between items-center">
                            {/* いいねボタン */}
                            <LikeButton
                                articleId={id}
                                isLoggedIn={isLoggedIn}
                            />
                            {isMyPage && (
                                <div className="flex items-center">
                                    <Link
                                        href={`/posts/${id}/edit`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded ml-4"
                                    >
                                        編集
                                    </Link>
                                    <form
                                        action={`/posts/${id}`}
                                        method="post"
                                        onSubmit={confirmDelete}
                                        className="ml-4"
                                    >
                                        <button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded"
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
        </div>
    );
};

export default ArticleList;

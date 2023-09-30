// 記事を一覧表示するコンポーネント

import React from "react";
import { Link } from "@inertiajs/react";
import { ArticleItems } from "@/types/ArticleProps";
import { useDeleteMyArticle } from "@/Hooks/useDeleteMyArticle";
import LikeButton from "./LikeButton";
import { useFormatDate, useformatPeriodDate } from "@/Hooks/useFormatDate";

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
        period_start,
        period_end,
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
    const formatPeriodDate = useformatPeriodDate();

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        {/* 記事のタイトル */}
                        <Link
                            href={`/posts/${id}`}
                            className="text-blue-500 hover:text-blue-600 text-2xl font-semibold"
                        >
                            {title}
                        </Link>
                        <div className="flex flex-col md:flex-row text-base text-gray-600 mt-2">
                            {/* 記事の作成者 */}
                            <span className="mr-4 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>
                                    {name}
                                </div>
                            </span>
                            {/* 記事の作成日時 */}
                            <span className="mr-4 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {formatDate(created_at)}
                                </div>
                            </span>
                            {/* 記事の更新日時 */}
                            <span className="mr-4 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                    {formatDate(updated_at)}
                                </div>
                            </span>
                        </div>
                        {/* 期間 */}
                        <div className="mt-2 mr-4">
                            {(period_start || period_end) && (
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                        />
                                    </svg>
                                    <span className="ml-2">
                                        {formatPeriodDate(period_start)}〜
                                        {formatPeriodDate(period_end)}
                                    </span>
                                </div>
                            )}
                        </div>
                        {/* 記事の概要 */}
                        <p className="mt-2 text-base text-gray-700">
                            {description}
                        </p>
                        {/* タグ */}
                        <div className="flex flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="mt-2 mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-lg"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {/* 画像 */}
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

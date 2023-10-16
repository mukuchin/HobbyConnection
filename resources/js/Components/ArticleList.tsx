// 記事を一覧表示するコンポーネント

import React, { useState, useEffect, useRef } from "react";
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

    // 改行をbrタグに変換
    function nl2br(str: string) {
        return str.replace(/\n/g, "<br />");
    }

    const [animationClass, setAnimationClass] = useState("");
    const articleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setAnimationClass("animate-text-focus-in5");
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (articleRef.current) {
            observer.observe(articleRef.current);
        }

        return () => {
            if (articleRef.current) {
                observer.unobserve(articleRef.current);
            }
        };
    }, []);

    return (
        <div ref={articleRef} className={`${animationClass} py-2 sm:py-6`}>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                <div className="py-2 sm:py-6 bg-white p-2 sm:p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        {/* 記事のタイトル */}
                        <Link
                            href={`/posts/${id}`}
                            className="flex justify-center text-blue-500 hover:text-blue-600 transition text-base sm:text-2xl font-noto-sans-jp font-semibold"
                        >
                            {title}
                        </Link>
                        <div className="font-noto-sans-jp flex flex-col md:flex-row text-xs sm:text-base text-gray-600 mt-2">
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
                        <div className="hidden sm:inline-block font-noto-sans-jp mt-2 mr-4 text-xs sm:text-base text-gray-600">
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
                                        {period_start
                                            ? formatPeriodDate(period_start)
                                            : ""}
                                        〜
                                        {period_end
                                            ? formatPeriodDate(period_end)
                                            : ""}
                                    </span>
                                </div>
                            )}
                        </div>
                        {/* 記事の概要 */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: nl2br(description),
                            }}
                            className="font-noto-sans-jp text-sm sm:text-base text-gray-600 mt-2 line-clamp-6 overflow-hidden"
                        ></div>
                        {/* タグ */}
                        <div className="font-noto-sans-jp flex flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="mt-2 mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs sm:text-base"
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
                                className="hidden md:inline-block mt-4 w-full h-56 object-cover rounded-md"
                            />
                        )}
                        <div className="mt-4 flex justify-between items-center">
                            {/* いいねボタン */}
                            <LikeButton
                                articleId={id}
                                isLoggedIn={isLoggedIn}
                            />
                            {/* マイページの時は編集ボタンと削除ボタンを表示する。 */}
                            {isMyPage && (
                                <div className="font-noto-sans-jp flex items-center">
                                    <Link
                                        href={`/posts/${id}/edit`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-base sm:text-xl font-semibold py-2 px-2 sm:px-4 rounded ml-4  transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
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
                                    </Link>
                                    <form
                                        action={`/posts/${id}`}
                                        method="post"
                                        onSubmit={confirmDelete}
                                        className="ml-2 sm:ml-4"
                                    >
                                        <button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-700 text-white text-base sm:text-xl font-semibold py-2 px-2 sm:px-4 rounded  transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
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
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
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

// 記事閲覧ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";
import { ArticleItems, ArticleUser } from "@/types/ArticleProps";
import LikeButton from "@/Components/LikeButton";
import { useFormatDate, useformatPeriodDate } from "@/Hooks/useFormatDate";

// Propsの型定義
interface ShowProps extends PageProps {
    article: ArticleItems;
    article_user: ArticleUser;
}

export default function show({ auth, article, article_user }: ShowProps) {
    const isLoggedIn = auth && auth.user !== null;
    const {
        title,
        period_start,
        period_end,
        description,
        image_top,
        sub_form_data,
        created_at,
        updated_at,
        tags,
    } = article;
    const { name } = article_user;

    const formatDate = useFormatDate();
    const formatPeriodDate = useformatPeriodDate();

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事" />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}

            {/* 記事の閲覧 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* タイトル */}
                            <div className="flex justify-center mb-4">
                                <h1 className="font-bold text-4xl text-left">
                                    {title}
                                </h1>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                {/* ユーザー名 */}
                                <p className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                        />
                                    </svg>
                                    <span className="ml-2">{name}</span>
                                </p>
                            </div>

                            {/* 投稿日時 */}
                            <p className="mb-4 flex items-center">
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
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="ml-2">
                                    {formatDate(created_at)}
                                </span>
                            </p>
                            {/* 更新日時 */}
                            <p className="mb-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                <span className="ml-2">
                                    {formatDate(updated_at)}
                                </span>
                            </p>
                            {/* 期間 */}
                            {(period_start || period_end) && (
                                <p className="mb-4 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
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
                                </p>
                            )}
                            <div className="text-left">
                                {/* タグ */}
                                <div className="mb-4">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className={
                                                "inline-flex items-center mb-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-lg mr-2"
                                            }
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                {/* TOP画像 */}
                                {image_top && (
                                    <div className="text-center mb-2">
                                        <img
                                            src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                            alt="TOP画像"
                                            width="600"
                                            className="mb-4 rounded-md shadow-md"
                                        />
                                    </div>
                                )}
                                {/* 概要 */}
                                <div className="flex justify-center mb-20">
                                    <div className="text-lg text-left">
                                        {description}
                                    </div>
                                </div>
                            </div>

                            {/* サブフォームの表示 */}
                            {sub_form_data && (
                                <ul>
                                    {sub_form_data.map(
                                        (data, index) =>
                                            (data.image || data.comment) && (
                                                <li
                                                    key={index}
                                                    className="mb-4"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        {/* サブフォームの画像 */}
                                                        {data.image && (
                                                            <div className="mb-2 text-center">
                                                                {" "}
                                                                {/* ここにtext-centerを追加 */}
                                                                <img
                                                                    src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${data.image}`}
                                                                    alt="サブフォームの画像"
                                                                    width="600"
                                                                    className="mb-4 rounded-md shadow-md"
                                                                />
                                                            </div>
                                                        )}
                                                        {/* サブフォームのコメント */}
                                                        <div className="w-full max-w-full text-lg text-left break-all mb-10">
                                                            {data.comment && (
                                                                <p>
                                                                    {
                                                                        data.comment
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                    )}
                                </ul>
                            )}
                            {/* いいねボタン */}
                            <div className="flex justify-end items-center mb-4">
                                <span className="mr-2 text-xl font-semibold">
                                    よかったら「いいね！」
                                </span>
                                <LikeButton
                                    articleId={article.id}
                                    isLoggedIn={isLoggedIn}
                                />
                            </div>
                        </div>
                    </div>
                    {/* ボタン群 */}
                    <div className="flex flex-col items-start justify-center mt-3">
                        {/* TOPページに戻る */}
                        <a
                            href="/"
                            className="flex items-center text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                                />
                            </svg>
                            <div className="text-xl font-bold">
                                TOPページへ
                            </div>
                        </a>

                        {/* マイページに戻る */}
                        <a
                            href="/mypage"
                            className="flex items-center w-55 mt-5 text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                                />
                            </svg>
                            <div className="text-xl font-bold">
                                マイページへ
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

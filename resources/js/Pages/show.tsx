// 記事閲覧ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";
import { ArticleItems, ArticleUser } from "@/types/ArticleProps";
import LikeButton from "@/Components/LikeButton";

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
                                <h1 className="font-bold text-5xl text-left">
                                    {title}
                                </h1>
                            </div>
                            {/* いいねボタン */}
                            <div className="flex flex-row-reverse mb-4">
                                <LikeButton
                                    articleId={article.id}
                                    isLoggedIn={isLoggedIn}
                                />
                            </div>
                            <div className="text-left">
                                {/* ユーザー名 */}
                                <p className="mb-4 text-xl">投稿者：{name}</p>
                                {/* 投稿日時 */}
                                <p className="mb-4 text-xl">
                                    作成日時：{created_at.slice(0, 10)}
                                </p>
                                {/* 更新日時 */}
                                <p className="mb-4 text-xl">
                                    更新日時：{updated_at.slice(0, 10)}
                                </p>
                                {/* タグ */}
                                <div className="mb-4 text-xl">
                                    タグ：
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full  text-xl"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* 期間 */}
                            {(period_start || period_end) && (
                                <p className="mb-4 text-xl">
                                    期間：
                                    {period_start && period_start.slice(0, 10)}
                                    〜{period_end && period_end.slice(0, 10)}
                                </p>
                            )}
                            {/* 中央に寄せる */}
                            <div className="flex flex-col items-center">
                                {/* TOP画像 */}
                                {image_top && (
                                    <div className="text-center mb-2">
                                        <img
                                            src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                            alt="TOP画像"
                                            width="full"
                                            className="mb-4 rounded-md shadow-md"
                                        />
                                    </div>
                                )}
                                {/* 概要 */}
                                <div className="flex justify-center mb-20">
                                    <div className="text-2xl text-left">
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
                                                                    width="1000"
                                                                    className="mb-4 rounded-md shadow-md"
                                                                />
                                                            </div>
                                                        )}
                                                        {/* サブフォームのコメント */}
                                                        <div className="w-full max-w-full text-2xl text-left break-all mb-10">
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
                                className="w-16 h-16 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                                />
                            </svg>
                            <div className="text-3xl font-bold">
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
                                className="w-16 h-16 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                                />
                            </svg>
                            <div className="text-3xl font-bold">
                                マイページへ
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

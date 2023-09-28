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
                            <h1 className="font-bold text-3xl mb-4 text-center">
                                {title}
                            </h1>
                            {/* いいねボタン。右に寄せる */}
                            <div className="text-right mb-4">
                                <LikeButton
                                    articleId={article.id}
                                    isLoggedIn={isLoggedIn}
                                />
                            </div>
                            {/* ユーザー名、作成日時、更新日時、タグ、期間、TOP画像、概要。左寄せ */}
                            <div className="text-left">
                                {/* ユーザー名 */}
                                <p className="mb-4">投稿者：{name}</p>
                                {/* 投稿日時 */}
                                <p className="mb-4">
                                    作成日時：{created_at.slice(0, 10)}
                                </p>
                                {/* 更新日時 */}
                                <p className="mb-4">
                                    更新日時：{updated_at.slice(0, 10)}
                                </p>
                                {/* タグ */}
                                <div className="mb-4">
                                    タグ：
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* 期間 */}
                            {(period_start || period_end) && (
                                <p className="mb-4">
                                    期間：
                                    {period_start && period_start.slice(0, 10)}
                                    〜{period_end && period_end.slice(0, 10)}
                                </p>
                            )}
                            {/* 中央に寄せる */}
                            <div className="flex flex-col items-center">
                                {/* TOP画像 */}
                                {image_top && (
                                    <div className="text-center mb-4">
                                        <img
                                            src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                            alt="TOP画像"
                                            width="500"
                                        />
                                    </div>
                                )}
                                {/* 概要 */}
                                <p className="mb-4 text-center">
                                    {description}
                                </p>
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
                                                            <div className="mb-4 text-center">
                                                                {" "}
                                                                {/* ここにtext-centerを追加 */}
                                                                <img
                                                                    src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${data.image}`}
                                                                    alt="サブフォームの画像"
                                                                    width="300"
                                                                />
                                                            </div>
                                                        )}
                                                        {/* サブフォームのコメント */}
                                                        {data.comment && (
                                                            <p>
                                                                {data.comment}
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                    )}
                                </ul>
                            )}
                            {/* ボタン群 */}
                            <div className="text-center mt-4">
                                {/* TOPページに戻る */}
                                <a
                                    href="/"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                                >
                                    TOPページへ
                                </a>
                                {/* マイページに戻る */}
                                <a
                                    href="/mypage"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    マイページへ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

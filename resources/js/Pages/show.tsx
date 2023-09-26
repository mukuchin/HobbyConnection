// 記事閲覧ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";
import { ArticleItems, ArticleUser } from "@/types/ArticleProps";
import LikeButton from "@/Components/LikeButton";

// --------------------------------------------------
// テスト用
// ユーザーがログインしているかどうかを判定するコンポーネント
import CurrentUser from "@/Components/CurrentUser";
// --------------------------------------------------

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

            {/* -------------------------------------------------- */}
            {/* テスト用 */}
            {/* ユーザーがログインしているかどうかを判定するコンポーネント */}
            <CurrentUser />
            {/* -------------------------------------------------- */}

            {/* 記事の閲覧 */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* タイトル */}
                            <h1 className="font-bold text-3xl mb-4">{title}</h1>
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
                            {/* 期間。開始日または終了日がある場合のみ表示する。 */}
                            {(period_start || period_end) && (
                                <p className="mb-4">
                                    期間：
                                    {period_start && period_start.slice(0, 10)}
                                    〜{period_end && period_end.slice(0, 10)}
                                </p>
                            )}
                            {/* TOP画像。S3に保存した画像を表示する。画像がある場合のみ表示する。 */}
                            {image_top && (
                                <img
                                    src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                    alt="TOP画像"
                                    className="mb-4"
                                    width="500"
                                />
                            )}
                            {/* 概要 */}
                            <p className="mb-4">{description}</p>
                            {/* いいねボタン */}
                            <LikeButton articleId={article.id} />
                            {/* サブフォームの表示。サブフォームが空ではない時にのみリスト形式で表示する。 */}
                            {sub_form_data && (
                                <ul>
                                    {sub_form_data.map(
                                        (data, index) =>
                                            // サブフォームの画像とコメントのいずれかがある場合のみ表示する。
                                            (data.image || data.comment) && (
                                                <li key={index}>
                                                    [{index + 1}]{" "}
                                                    {/* サブフォームの画像。S3に保存した画像を表示する。画像がある場合のみ表示する。 */}
                                                    {data.image && (
                                                        <img
                                                            src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${data.image}`}
                                                            alt="サブフォームの画像"
                                                            className="mb-4"
                                                            width="300"
                                                        />
                                                    )}
                                                    {/* サブフォームのコメント */}
                                                    {data.comment && (
                                                        <p className="mb-4">
                                                            {data.comment}
                                                        </p>
                                                    )}
                                                </li>
                                            )
                                    )}
                                </ul>
                            )}
                            {/* TOPページに戻る */}
                            <a
                                href="/"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        </>
    );
}

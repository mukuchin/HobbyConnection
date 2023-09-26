// 記事を一覧表示するコンポーネント

import React from "react";
import { Link } from "@inertiajs/react";
import { ArticleItems } from "@/types/ArticleProps";
import { useDeleteMyArticle } from "@/Hooks/useDeleteMyArticle";
import LikeButton from "./LikeButton";

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
    const { id, title, description, image_top, user, created_at, updated_at } =
        article;
    const { name } = user;
    const { confirmDelete } = useDeleteMyArticle(id);

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
                                作成日時：{created_at.slice(0, 10)}
                            </p>
                            <p className="text-sm">
                                更新日時：{updated_at.slice(0, 10)}
                            </p>
                            <p className="text-sm">概要：{description}</p>
                            {/* 画像がある記事のみ画像を表示する。 */}
                            {image_top && (
                                <img
                                    src={`https://hobbyconnection-bucket.s3-ap-northeast-1.amazonaws.com/${image_top}`}
                                    alt="TOP画像"
                                    className="mb-4"
                                    width="200"
                                />
                            )}
                            <LikeButton
                                articleId={id}
                                initialIsLiked={false}
                                initialLikesCount={0}
                            />
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

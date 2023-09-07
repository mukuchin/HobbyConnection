// ペジネーションコンポーネント
// TOPページとマイページの記事一覧に使用

import React from "react";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";

// このコンポーネントで使用するpropsの型定義
interface PaginationProps extends PageProps {
    // 現在のページ番号
    page: number;
    // 最終ページ番号
    lastPage: number;
}

// ペジネーションコンポーネント
const Pagination: React.FC<PaginationProps> = ({
    page,
    lastPage,
}: PaginationProps) => {
    // ページネーションの表示数
    const displayPage = 3;

    // ページネーションの表示開始位置
    let startPage = page - Math.floor(displayPage / 2);
    if (startPage < 2) {
        startPage = 2;
    }

    // ページネーションの表示終了位置
    let endPage = startPage + displayPage - 1;
    if (endPage > lastPage - 1) {
        endPage = lastPage - 1;
    }

    // ページネーションの表示位置を調整
    if (endPage - startPage < displayPage - 1 && startPage > 1) {
        startPage = endPage - displayPage + 1;
        if (startPage < 1) {
            startPage = 1;
        }
    }
    if (endPage - startPage < displayPage - 1 && endPage < lastPage) {
        endPage = startPage + displayPage - 1;
    }

    // ページネーションの各ページへのリンクを表示
    const pages = [];

    // 最初のページへのリンクを表示
    pages.push(
        <Link
            key={1}
            href={`/?page=${1}`}
            className={`${
                page === 1
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-800"
            } border border-gray-400 px-4 py-1 mr-1 rounded`}
        >
            {1}
        </Link>
    );

    // 省略記号（...）を表示
    if (startPage > 2) {
        pages.push(
            <span
                key="start-ellipsis"
                className="border border-gray-400 px-4 py-1 mr-1 rounded"
            >
                ...
            </span>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <Link
                key={i}
                href={`/?page=${i}`}
                className={`${
                    i === page
                        ? "bg-blue-500 hover:bg-blue-700 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                } border border-gray-400 px-4 py-1 mr-1 rounded`}
            >
                {i}
            </Link>
        );
    }

    // 省略記号（...）を表示
    if (endPage < lastPage - 1) {
        pages.push(
            <span
                key="end-ellipsis"
                className="border border-gray-400 px-4 py-1 mr-1 rounded"
            >
                ...
            </span>
        );
    }

    // 最後のページへのリンクを表示
    pages.push(
        <Link
            key={lastPage}
            href={`/?page=${lastPage}`}
            className={`${
                page === lastPage
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-800"
            } border border-gray-400 px-4 py-1 mr-1 rounded`}
        >
            {lastPage}
        </Link>
    );

    return (
        <div className="flex justify-center">
            {/* 前のページへのリンク */}
            {page > 1 && (
                <Link
                    href={`/?page=${page - 1}`}
                    className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 px-4 py-1 mr-1 rounded"
                >
                    前のページ
                </Link>
            )}
            {/* ページネーションの各ページへのリンク */}
            {pages}
            {/* 次のページへのリンク */}
            {page < lastPage && (
                <Link
                    href={`/?page=${page + 1}`}
                    className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 px-4 py-1 mr-1 rounded"
                >
                    次のページ
                </Link>
            )}
        </div>
    );
};

export default Pagination;

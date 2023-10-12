// ペジネーションコンポーネント
// TOPページとマイページの記事一覧に使用

import React from "react";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";

// このコンポーネントで使用するpropsの型定義
interface PaginationProps extends PageProps {
    page: number; // 現在のページ番号
    lastPage: number; // 最後のページ番号
    baseUrl: string; // ページネーションリンクの基本URL
    paginationInfo: {
        // ページネーション情報
        total: number;
        perPage: number;
        currentPage: number;
    };
}

// ペジネーションコンポーネント
const Pagination: React.FC<PaginationProps> = ({
    page,
    lastPage,
    baseUrl,
    paginationInfo,
}: PaginationProps) => {
    // ページネーションの各ページへのリンクをクリックしたときの処理
    const handleLinkClick = (
        e:
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>
    ) => {
        // ペジネーションでの遷移フラグをセッションストレージに設定
        sessionStorage.setItem("paginationTransition", "true");
    };

    // ページネーションの表示数
    const displayPage = 3;

    // 記事数が5未満ならば何も表示しない
    if (lastPage <= 1) {
        return null;
    }

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
    if (startPage > 1) {
        pages.push(
            <Link
                key={1}
                href={`${baseUrl}?page=${1}`}
                className={`${
                    page === 1
                        ? "bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 sm:px-4 rounded transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                        : "hover:bg-gray-100 text-gray-800"
                } text-sm sm:text-xl font-bold py-1 px-3 width-425:px-4 mr-1 rounded`}
                onClick={handleLinkClick}
            >
                {1}
            </Link>
        );
    }

    // 省略記号（...）を表示（開始位置）
    if (startPage > 2) {
        pages.push(
            <span
                key="start-ellipsis"
                className="text-sm font-bold py-1 mr-1 rounded flex items-center h-8"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mb-1 width-425:mb-0 w-4 h-4 width-425:w-6 width-425:h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>
            </span>
        );
    }

    // ページネーションの各ページへのリンクを表示
    for (let i = startPage; i <= endPage; i++) {
        if (i <= lastPage) {
            pages.push(
                <Link
                    key={i}
                    href={`${baseUrl}?page=${i}`}
                    className={`${
                        i === page
                            ? "bg-blue-500 hover:bg-blue-700 text-white transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                            : "hover:bg-gray-100 text-gray-800"
                    } text-sm sm:text-xl font-bold py-1 px-3 width-425:px-4 mr-1 rounded`}
                    onClick={handleLinkClick}
                >
                    {i}
                </Link>
            );
        }
    }

    // 省略記号（...）を表示（終了位置）
    if (endPage < lastPage - 1) {
        pages.push(
            <span
                key="end-ellipsis"
                className="text-xl font-bold py-1 mr-1 rounded flex items-center h-8"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="mb-1 sm:mb-0 w-4 h-4 width-425:w-6 width-425:h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>
            </span>
        );
    }

    // 最後のページへのリンクを表示
    if (endPage < lastPage) {
        pages.push(
            <Link
                key={lastPage}
                href={`${baseUrl}?page=${lastPage}`}
                className={`${
                    page === lastPage
                        ? "bg-blue-500 hover:bg-blue-700 text-white transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset"
                        : "hover:bg-gray-100 text-gray-800"
                } text-sm sm:text-xl font-bold py-1 px-3 width-425:px-4 mr-1 rounded`}
                onClick={handleLinkClick}
            >
                {lastPage}
            </Link>
        );
    }

    const startItem =
        (paginationInfo.currentPage - 1) * paginationInfo.perPage + 1;
    const endItem = Math.min(
        paginationInfo.currentPage * paginationInfo.perPage,
        paginationInfo.total
    );

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center">
                {/* 前のページへのリンク */}
                {page > 1 && (
                    <Link
                        href={`${baseUrl}?page=${page - 1}`}
                        className="hover:bg-gray-100 text-gray-800 text-xl font-extrabold py-1 px-2 mr-1 rounded"
                        onClick={handleLinkClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 width-425:w-6 width-425:h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </Link>
                )}
                {/* ページネーションの各ページへのリンク */}
                {pages.map((pageItem) =>
                    React.cloneElement(pageItem, {
                        className: `${pageItem.props.className} h-8`,
                    })
                )}
                {/* 次のページへのリンク */}
                {page < lastPage && (
                    <Link
                        href={`${baseUrl}?page=${page + 1}`}
                        className="hover:bg-gray-100 text-gray-800 text-xl font-extrabold py-1 mr-1 rounded"
                        onClick={handleLinkClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 width-425:w-6 width-425:h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </Link>
                )}
            </div>
            <div className="mt-2 text-sm sm:text-xl">
                {paginationInfo.total}本中 {startItem}本～{endItem}
                本目
            </div>
        </div>
    );
};

export default Pagination;

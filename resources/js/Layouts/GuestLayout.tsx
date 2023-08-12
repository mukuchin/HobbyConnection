// ログアウト時のナビゲーションバーのレイアウト

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useState, PropsWithChildren, ReactNode } from "react";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div>
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* ページタブ */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("top")}
                                    active={route().current("top")}
                                >
                                    TOP
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("create")}
                                    active={route().current("create")}
                                >
                                    記事投稿
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("mypage")}
                                    active={route().current("mypage")}
                                >
                                    マイページ
                                </NavLink>
                            </div>
                        </div>

                        {/* ログインと新規ユーザー登録のリンク。ページの右に寄せる。*/}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <NavLink
                                href={route("login")}
                                active={route().current("login")}
                                className="text-sm text-gray-700 underline"
                            >
                                ログイン
                            </NavLink>
                            <NavLink
                                href={route("register")}
                                active={route().current("register")}
                                className="ml-4 text-sm text-gray-700 underline"
                            >
                                新規ユーザー登録
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

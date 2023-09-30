// ログアウト時のナビゲーションバー

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import React, { PropsWithChildren, ReactNode, memo } from "react";
import NavLink from "@/Components/NavLink";

interface PageTabProps {
    href: string;
    currentRoute: string;
    children: ReactNode;
}

const PageTab: React.FC<PageTabProps> = ({ href, currentRoute, children }) => (
    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
        <NavLink
            href={href}
            active={route().current(currentRoute)}
            className="text-xl"
        >
            {children}
        </NavLink>
    </div>
);

function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div>
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>

                            <PageTab href={route("top")} currentRoute="top">
                                TOP
                            </PageTab>
                            <PageTab
                                href={route("create")}
                                currentRoute="create"
                            >
                                記事投稿
                            </PageTab>
                            <PageTab
                                href={route("mypage")}
                                currentRoute="mypage"
                            >
                                マイページ
                            </PageTab>
                        </div>

                        <div className="flex">
                            <PageTab href={route("login")} currentRoute="login">
                                ログイン
                            </PageTab>
                            <PageTab
                                href={route("register")}
                                currentRoute="register"
                            >
                                新規ユーザー登録
                            </PageTab>
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

export default memo(Guest);

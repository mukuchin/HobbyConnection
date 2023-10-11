// ログイン時のナビゲーションバー

import React, {
    useState,
    useEffect,
    PropsWithChildren,
    ReactNode,
    memo,
} from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

interface PageTabProps {
    href: string;
    currentRoute: string;
    children: ReactNode;
}

const PageTab: React.FC<PageTabProps> = ({ href, currentRoute, children }) => (
    <div className="space-x-4 sm:space-x-8 sm:-my-px ml-5 sm:ml-10 flex">
        <NavLink
            href={href}
            active={route().current(currentRoute)}
            className="text-sm md:text-lg"
        >
            {children}
        </NavLink>
    </div>
);

function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown] = useState(false);
    const [navOffsetY, setNavOffsetY] = useState(0);

    // スクロール量がロゴの高さを超えた場合、その分だけナビゲーションバーを上に移動させる
    useEffect(() => {
        const handleScroll = () => {
            const screenWidth = window.innerWidth;
            const logoHeight = screenWidth <= 640 ? 50 : 90;
            setNavOffsetY(Math.min(window.scrollY, logoHeight));
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div style={{ height: "120px", overflowY: "auto" }}>
                <nav
                    className="bg-white border-b border-gray-100 fixed top-0 w-full z-50"
                    style={{ transform: `translateY(-${navOffsetY}px)` }}
                >
                    <div className="font-noto-sans-jp max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="ml-4 sm:ml-8 shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="flex justify-between h-20">
                            <div className="flex">
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

                            <div className="flex items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            {/* 画面が広い時に表示する。 */}
                                            <span className="hidden sm:inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm md:text-lg leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                            <span className="sm:hidden inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm md:text-lg leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                プロフィール編集
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                ログアウト
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

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

export default memo(Authenticated);

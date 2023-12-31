// ログアウト時のナビゲーションバー

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import React, {
    useState,
    useEffect,
    PropsWithChildren,
    ReactNode,
    memo,
} from "react";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";

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
            className="text-sm md:text-lg font-black"
        >
            {children}
        </NavLink>
    </div>
);

function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [navOffsetY, setNavOffsetY] = useState(0);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const { props } = usePage(); // Inertiaのページプロップを取得
    const reload = props.reload; // reloadプロップを取得

    // スクロール量がロゴの高さを超えた場合、その分だけナビゲーションバーを上に移動させる
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const screenWidth = window.innerWidth;
            const logoHeight = screenWidth <= 640 ? 50 : 75;

            if (prevScrollPos > currentScrollPos || currentScrollPos <= 0) {
                setNavOffsetY(0); // 上にスクロールした場合、ナビゲーションバーをリセット
            } else {
                setNavOffsetY(Math.min(currentScrollPos, logoHeight));
            }

            setPrevScrollPos(currentScrollPos); // 現在のスクロール位置を保存
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    // ログアウト処理。"/"でログアウトしても、画面を更新できるようにする。
    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload]);

    return (
        <div>
            <div style={{ height: "90px" }}>
                <nav
                    className="bg-gradient-to-t from-yellow-50 to-sky-100 border-b border-gray-100 fixed w-full z-50"
                    style={{
                        transform: `translateY(-${navOffsetY}px)`,
                        transition: "transform 0.4s ease-in-out",
                    }}
                >
                    <div className="font-noto-sans-jp max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="ml-4 sm:ml-8 mt-2 shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="flex justify-between h-12">
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

                            {/* 画面が広い時に表示する。 */}
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                                <PageTab
                                    href={route("login")}
                                    currentRoute="login"
                                >
                                    ログイン
                                </PageTab>
                                <PageTab
                                    href={route("register")}
                                    currentRoute="register"
                                >
                                    新規ユーザー登録
                                </PageTab>
                            </div>
                            {/* 画面が狭い時にハンバーガーアイコンにする。 */}
                            <div className="sm:hidden flex items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm md:text-lg leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                                                href={route("login")}
                                            >
                                                ログイン
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("register")}
                                            >
                                                新規ユーザー登録
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
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

export default memo(Guest);

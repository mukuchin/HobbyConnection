// 記事編集ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import AppHead from "../Layouts/AppHead";
import { PageProps } from "@/types";

export default function edit({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    return (
        <>
            {/* ページ名・タブ名表示 */}
            <AppHead title="記事編集" />

            {/* ナビゲーションバー */}
            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user} />
            ) : (
                <GuestLayout />
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            記事編集するぜ！
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function mypage({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    return (
        <>
            <Head title="マイページ" />

            {isLoggedIn ? (
                <AuthenticatedLayout user={auth.user}></AuthenticatedLayout>
            ) : (
                <GuestLayout></GuestLayout>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            自分のプロフィールと自分が投稿した記事が表示されるぜ！
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

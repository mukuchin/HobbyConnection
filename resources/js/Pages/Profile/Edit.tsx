// プロフィール編集ページ

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AppHead from "@/Layouts/AppHead";
import { PageProps } from "@/types";
import FooterComponent from "@/Components/FooterComponent";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            {/* ナビゲーションバー */}
            <AuthenticatedLayout user={auth.user} />
            {/* ページ名・タブ名表示 */}
            <AppHead title="プロフィール編集" />
            <div className="bg-fixed bg-various-hobby">
                <div className="flex flex-col items-center justify-center font-noto-sans-jp min-h-screen py-12">
                    <div className="max-w-7xl w-full sm:px-6 lg:px-8">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-bold text-3xl sm:text-4xl mb-4">
                                プロフィール編集
                            </h1>
                        </div>
                    </div>
                    <div className="max-w-7xl w-full sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl mx-auto"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl mx-auto" />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl mx-auto" />
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        </>
    );
}

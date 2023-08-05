import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function top({ auth }: PageProps) {
    const isLoggedIn = auth.user !== null;

    return (
        <>
            {isLoggedIn ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TOPページ</h2>}
                >
                    <Head title="Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">You're logged in!</div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <GuestLayout>
                    <Head title="Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">You're logged out!</div>
                            </div>
                        </div>
                    </div>
                </GuestLayout>
            )}
        </>
    );
}

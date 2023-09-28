import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md w-full space-y-4">
                    <div className="mb-4 text-sm text-gray-600">
                        パスワードをお忘れですか？大丈夫です。メールアドレスをお知らせいただければ、パスワード再設定用のリンクをメールでお送りします。
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4"
                                disabled={processing}
                            >
                                パスワード再設定用のリンクを送信する
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import AppHead from "@/Layouts/AppHead";
import FooterComponent from "@/Components/FooterComponent";
import { useRemoveHoverEffect } from "@/Hooks/useRemoveHoverEffect";

export default function Register() {
    // タッチデバイスの場合はホバー効果を削除する
    useRemoveHoverEffect();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        termsAccepted: false,
        privacyPolicyAccepted: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <AppHead title="新規ユーザ登録" />

            <div className="bg-fixed bg-various-hobby">
                <div className="ml-2 mr-2 flex flex-col items-center justify-center min-h-screen">
                    <div className="max-w-md w-full space-y-4 font-noto-sans-jp">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <div className="flex flex-row items-center">
                                    <InputLabel
                                        htmlFor="name"
                                        value="ユーザー名"
                                    />
                                    <div className="ml-4 text-sm text-gray-600">
                                        ※ユーザー名は公開されます。
                                    </div>
                                </div>

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 p-2 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="email"
                                    value="メールアドレス"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 p-2 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="パスワード"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 p-2 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="パスワードの確認"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 p-2 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    checked={data.termsAccepted}
                                    onChange={(e) =>
                                        setData(
                                            "termsAccepted",
                                            e.target.checked
                                        )
                                    }
                                />
                                <label htmlFor="termsAccepted" className="ml-2">
                                    <a
                                        href="/policy/HobbyConnection_利用規約.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-600 hover:text-blue-900"
                                    >
                                        利用規約
                                    </a>
                                    に同意します。
                                </label>
                            </div>

                            <div className="mt-4">
                                <input
                                    type="checkbox"
                                    id="privacyPolicyAccepted"
                                    checked={data.privacyPolicyAccepted}
                                    onChange={(e) =>
                                        setData(
                                            "privacyPolicyAccepted",
                                            e.target.checked
                                        )
                                    }
                                />
                                <label
                                    htmlFor="privacyPolicyAccepted"
                                    className="ml-2"
                                >
                                    <a
                                        href="/policy/HobbyConnection_プライバシーポリシー.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-600 hover:text-blue-900"
                                    >
                                        プライバシーポリシー
                                    </a>
                                    に同意します。
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4 space-x-4">
                                <Link
                                    href={route("login")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    登録済みの方はこちら
                                </Link>

                                <PrimaryButton
                                    className="ml-4"
                                    disabled={
                                        processing ||
                                        !data.termsAccepted ||
                                        !data.privacyPolicyAccepted
                                    }
                                >
                                    登録
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
                <FooterComponent />
            </div>
        </GuestLayout>
    );
}

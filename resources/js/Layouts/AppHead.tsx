// ページ名とタブ名を設定する

import { Head } from "@inertiajs/react";

type SiteProps = {
    title?: string;
};

export default function Site({ title }: SiteProps) {
    return (
        <Head>
            <title>
                {/* タブ名を表示する */}
                {title ? `${title} - Hobby Connection` : "Hobby Connection"}
            </title>
        </Head>
    );
}

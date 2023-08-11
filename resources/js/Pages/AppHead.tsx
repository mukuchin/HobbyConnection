import { Head } from "@inertiajs/react";

type SiteProps = {
    title?: string;
};

export default function Site({ title }: SiteProps) {
    return (
        <Head>
            <title>
                {title ? `${title} - ホビーコネクション` : "ホビーコネクション"}
            </title>
        </Head>
    );
}

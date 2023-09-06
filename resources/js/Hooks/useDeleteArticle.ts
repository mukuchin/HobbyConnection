import { useForm } from "@inertiajs/react";

export const useDeleteArticle = (id: number) => {
    const { delete: destroy } = useForm();

    // 削除ボタンを押したときに、確認メッセージを表示する
    const confirmDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm("一度削除した記事は元に戻せません。本当に削除しますか？")) {
            handleDelete();
        }
    };

    // 削除ボタンがクリックされたときの処理
    const handleDelete = () => {
        // 削除処理
        destroy(`/posts/${id}`);
    };

    return { confirmDelete };
};

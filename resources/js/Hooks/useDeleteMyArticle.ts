import { useForm } from "@inertiajs/react";

export const useDeleteMyArticle = (id: number) => {
    const { delete: destroy } = useForm();

    // 削除ボタンを押したときに、確認メッセージを表示する
    const confirmDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm("削除した記事は元に戻せません。本当に削除しますか？")) {
            handleDelete();
        }
    };

    // 確認メッセージでOKを押したときに、記事を削除する
    const handleDelete = () => {
        destroy(`/posts/${id}`);
    };

    return { confirmDelete };
};

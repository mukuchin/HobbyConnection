// 記事の情報を受け取るための型
export type ArticleItems = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    description: string;
    image_top: string;
    sub_form_data: string[];
    user: ArticleUser;
    created_at: string;
    updated_at: string;
};

// 記事を投稿したユーザーの型
export type ArticleUser = {
    id: number;
    name: string;
    email: string;
};

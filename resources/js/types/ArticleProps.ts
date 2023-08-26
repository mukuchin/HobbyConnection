// 記事の情報を受け取るための型
export type ArticleItems = {
    title: string;
    period_start: string;
    period_end: string;
    description: string;
};

// 記事を投稿したユーザーの型
export type ArticleUser = {
    id: number;
    name: string;
    email: string;
};

// 記事の情報を受け取るための型
export type ArticleProps = {
    article: {
        title: string;
        period_start: string;
        period_end: string;
        description: string;
    };
};
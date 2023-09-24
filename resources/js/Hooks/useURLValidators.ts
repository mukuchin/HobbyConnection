// URLのバリデーション関数をまとめたカスタムフック

// URLかどうかを判定する関数
export const isFullURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

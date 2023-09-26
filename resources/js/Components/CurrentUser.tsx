// 現在のユーザー情報を表示するコンポーネント

import { useEffect, useState } from "react";
import axios from "axios";

type User = {
    name: string;
    email: string;
    // 必要に応じて他のプロパティも追加
};

function CurrentUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // APIを呼び出して現在のユーザー情報を取得
        axios
            .get("/api/user")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("ユーザー情報の取得に失敗しました:", error);
            });
    }, []);

    if (!user) {
        return <div>ユーザー情報を取得中...</div>;
    }

    return (
        <div>
            <h2>現在のユーザー情報</h2>
            <p>名前: {user.name}</p>
            <p>メール: {user.email}</p>
            {/* 他のユーザー情報も表示できます */}
        </div>
    );
}

export default CurrentUser;

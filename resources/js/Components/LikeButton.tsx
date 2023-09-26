// いいねボタンのコンポーネント

import React, { useState, useEffect } from "react";
import axios from "axios";

interface LikeButtonProps {
    articleId: number;
    isLoggedIn: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId, isLoggedIn }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    // コンポーネントがマウントされたときにAPIを呼び出す
    useEffect(() => {
        const fetchLikeData = async () => {
            try {
                const response = await axios.get(
                    `/api/likes/data/${articleId}`
                );
                setIsLiked(response.data.isLiked);
                setLikesCount(response.data.likesCount);
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        };

        fetchLikeData();
    }, [articleId]);

    // いいねの状態を切り替える関数
    const toggleLike = async () => {
        // ログインしていない場合は、いいねできないようにする
        if (isLoggedIn === true) {
            try {
                // ここでバックエンドのAPIを呼び出して「いいね」の状態を更新する
                const response = await axios.post(`/api/likes/${articleId}`);
                setIsLiked(response.data.isLiked);
                setLikesCount(response.data.likesCount);
            } catch (error) {
                console.error("Error toggling like:", error);
            }
        } else {
            alert("いいねをするには、ログインしてください。");
        }
    };

    return (
        <div>
            <button
                onClick={toggleLike}
                className={isLiked ? "text-red-500" : ""}
            >
                {isLiked ? "❤️" : "♡"}
            </button>
            <span>{likesCount}</span>
        </div>
    );
};

export default LikeButton;

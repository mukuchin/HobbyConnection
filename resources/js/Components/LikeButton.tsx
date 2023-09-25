// いいねボタンのコンポーネント

import React, { useState } from "react";
import axios from "axios";

interface LikeButtonProps {
    articleId: number;
    initialIsLiked: boolean;
    initialLikesCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    articleId,
    initialIsLiked,
    initialLikesCount,
}) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    const toggleLike = async () => {
        try {
            // ここでバックエンドのAPIを呼び出して「いいね」の状態を更新します。
            const response = await axios.post(`/api/likes/${articleId}`);
            setIsLiked(response.data.isLiked);
            setLikesCount(response.data.likesCount);
        } catch (error) {
            console.error("Error toggling like:", error);
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

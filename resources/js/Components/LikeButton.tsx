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
        <div className="flex items-center">
            <button
                onClick={toggleLike}
                className={isLiked ? "text-red-500" : ""}
            >
                {isLiked ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                )}
            </button>
            {/* いいねの数 */}
            <span className="text-3xl text-center w-10">{likesCount}</span>
        </div>
    );
};

export default LikeButton;

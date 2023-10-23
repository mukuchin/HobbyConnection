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
    const [animate, setAnimate] = useState(false);

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

                // 現在の「いいね」の状態が「いいねされていない」場合のみアニメーションを開始
                if (!isLiked) {
                    setAnimate(true);
                }

                setIsLiked(response.data.isLiked);
                setLikesCount(response.data.likesCount);
            } catch (error) {
                console.error("Error toggling like:", error);
            }
        } else {
            alert("いいねをするには、ログインしてください。");
        }
    };

    // アニメーションが終了したときに呼び出される関数
    const handleAnimationEnd = () => {
        setAnimate(false);
    };

    return (
        <div className="flex items-center">
            <button
                onClick={toggleLike}
                onAnimationEnd={handleAnimationEnd} // アニメーションが終了したときの処理
                className={`${isLiked ? "text-red-500" : ""} ${
                    animate ? "animate-scaleAnimation" : ""
                } transform transition-transform duration-300 hover-grow`}
            >
                {isLiked ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-10 h-10"
                    >
                        <defs>
                            <radialGradient
                                id="balloonGradient"
                                cx="50%"
                                cy="50%"
                                r="70%"
                                fx="50%"
                                fy="50%"
                            >
                                <stop
                                    offset="0%"
                                    style={{ stopColor: "rgb(255,0,0)" }}
                                />
                                <stop
                                    offset="90%"
                                    style={{ stopColor: "rgb(220,20,60)" }}
                                />
                                <stop
                                    offset="100%"
                                    style={{ stopColor: "rgb(255,0,0)" }}
                                />
                            </radialGradient>
                            <radialGradient
                                id="highlightGradient"
                                cx="35%"
                                cy="35%"
                                r="30%"
                                fx="35%"
                                fy="35%"
                            >
                                <stop
                                    offset="0%"
                                    style={{
                                        stopColor: "rgba(255,255,255,0.4)",
                                    }}
                                />
                                <stop
                                    offset="100%"
                                    style={{ stopColor: "rgba(255,255,255,0)" }}
                                />
                            </radialGradient>
                        </defs>
                        <path
                            fill="url(#balloonGradient)"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                        <path
                            fill="url(#highlightGradient)"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
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

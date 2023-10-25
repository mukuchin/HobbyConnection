// 投稿後に「投稿しました！」、更新後に「更新しました！」と表示するコンポーネント

import React, { useEffect, useRef } from "react";

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(onClose, 5000); // 5秒後に非表示

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const handleSwipe = (e: React.TouchEvent) => {
        if (notificationRef.current) {
            const touch = e.changedTouches[0];
            const initialY = touch.clientY;
            if (initialY < 50) {
                onClose();
            }
        }
    };

    return (
        <div
            ref={notificationRef}
            className="fixed top-24 sm:top-28 sm:mt-2 w-full bg-green-500 text-white p-4 text-center"
            onTouchEnd={handleSwipe}
        >
            {message}
            <button className="absolute top-2 right-2" onClick={onClose}>
                ✖
            </button>
        </div>
    );
};

export default Notification;

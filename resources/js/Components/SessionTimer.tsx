import React, { useState, useEffect } from "react";

const SessionTimer: React.FC = () => {
    const sessionDuration = 120 * 60; // セッション時間（分）を秒に変換
    const startTime = new Date().getTime();

    const [elapsedTime, setElapsedTime] = useState(0);

    // タイマーの表示
    const showTimer = () => {
        const currentTime = new Date().getTime();
        const elapsedTimeSec = Math.floor((currentTime - startTime) / 1000);

        setElapsedTime(elapsedTimeSec);

        // 残り時間のアラート
        const remainingTime = sessionDuration - elapsedTimeSec;
        switch (remainingTime) {
            case 3600:
                alert("残り1時間です！");
                break;
            case 1800:
                alert("残り30分です！");
                break;
            case 600:
                alert("残り10分です！");
                break;
            case 300:
                alert("残り5分です！");
                break;
            case 60:
                alert("残り1分です！");
                break;
            case 0:
                alert("残り時間がなくなりました！");
                return; // 残り時間が0になったら、この関数の実行を終了します。
            default:
                break;
        }

        setTimeout(showTimer, 10);
    };

    useEffect(() => {
        showTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const timeLeft = sessionDuration - elapsedTime;
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // 残り時間が10分以下かどうかを判定
    const isTimeRunningOut = sessionDuration - elapsedTime <= 600;

    return (
        <div
            className={`text-lg mb-2 font-noto-sans-jp font-medium ${
                isTimeRunningOut ? "text-red-500" : "text-gray-500"
            }`}
        >
            残り時間: {String(hours)}時間 {String(minutes).padStart(2, "0")}分{" "}
            {String(seconds).padStart(2, "0")}秒
        </div>
    );
};

export default SessionTimer;

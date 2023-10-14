import React, { useState, useEffect } from "react";

const SessionTimer: React.FC = () => {
    const sessionDuration = 120 * 60; // 120分を秒に変換
    const startTime = new Date().getTime();

    const [elapsedTime, setElapsedTime] = useState(0);

    // タイマーの表示
    const showTimer = () => {
        const currentTime = new Date().getTime();
        const elapsedTimeSec = Math.floor((currentTime - startTime) / 1000);

        setElapsedTime(elapsedTimeSec);

        // 残り時間のアラート
        const alertTimes = [3600, 1800, 600, 300, 60];
        if (alertTimes.includes(sessionDuration - elapsedTimeSec)) {
            alert(`残り時間: ${sessionDuration - elapsedTimeSec}秒です！`);
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

    return (
        <div className="text-lg text-gray-500 mb-2 font-noto-sans-jp font-medium">
            残り時間: {String(hours)}時間 {String(minutes).padStart(2, "0")}分{" "}
            {String(seconds).padStart(2, "0")}秒
        </div>
    );
};

export default SessionTimer;

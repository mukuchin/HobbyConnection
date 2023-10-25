// タッチデバイスの場合はホバー効果を削除するカスタムフック

export const useRemoveHoverEffect = () => {
    // タッチデバイスの場合はホバー効果を削除
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
        const hoverButtons = document.querySelectorAll("button");
        hoverButtons.forEach((button) => {
            button.classList.remove("hover:bg-blue-700");
            button.classList.remove("hover:bg-green-700");
            button.classList.remove("hover:bg-red-700");
            button.classList.remove("hover-grow");
            button.classList.remove("hover:text-gray-700");
            button.classList.remove("hover-target");
        });
    }
};

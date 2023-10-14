// ページ下部のコンポーネント

import React from "react";

const FooterComponent: React.FC = () => {
    return (
        <div className="p-5 flex items-center">
            <a href="/">
                <div className="footer-logo">
                    <img
                        src="/images/HobbyConnectionLogo3.png"
                        alt="Your App Logo"
                        className="w-80"
                    />
                </div>
            </a>
            <div className="ml-4 flex flex-col footer-links space-y-2 whitespace-nowrap font-noto-sans-jp text-sm width-425:text-base">
                <div>
                    <a
                        href="/policy/HobbyConnection_利用規約.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        利用規約
                    </a>
                </div>
                <div>
                    <a
                        href="/policy/HobbyConnection_プライバシーポリシー.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        プライバシーポリシー
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;

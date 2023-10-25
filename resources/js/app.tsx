import "./bootstrap";
import "../css/app.css";
import "../css/custom.css";
import "nprogress/nprogress.css";
import { Helmet } from "react-helmet";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import NProgress from "nprogress";
import { router } from "@inertiajs/react";

// NProgress イベントリスナーの追加
router.on("start", () => NProgress.start());
router.on("finish", () => NProgress.done());

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <App {...props} />
            </>
        );
    },
    progress: false,
});

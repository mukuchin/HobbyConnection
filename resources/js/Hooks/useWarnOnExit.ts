import { useEffect, useState } from "react";
import { FormValues } from "@/Hooks/useUnifiedArticleForm";

export const useWarnOnExit = (
    values: FormValues,
    isDirtyCheck?: () => boolean,
    message: string = "入力内容がリセットされます。本当に移動してもよろしいですか？"
) => {
    const [isDirty, setIsDirty] = useState(false);
    const [shouldWarn, setShouldWarn] = useState(false);

    useEffect(() => {
        const checkIfFormIsDirty = () => {
            let dirty = false;
            if (
                values.title ||
                values.period_start ||
                values.period_end ||
                values.description
            ) {
                dirty = true;
            }

            if (values.tags.length > 0) {
                dirty = true;
            }

            for (let subFormData of values.sub_form_data) {
                if (subFormData.heading || subFormData.comment) {
                    dirty = true;
                    break;
                }
            }

            setIsDirty(dirty);
        };

        checkIfFormIsDirty();
    }, [values]);

    useEffect(() => {
        if (isDirtyCheck) {
            setShouldWarn(isDirty && isDirtyCheck());
        } else {
            setShouldWarn(isDirty);
        }
    }, [isDirty, isDirtyCheck]);

    useEffect(() => {
        if (!shouldWarn) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = message;
        };

        const handleLinkClick = (event: Event) => {
            if (!window.confirm(message)) {
                event.preventDefault();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        const links = document.querySelectorAll("a");
        links.forEach((link) =>
            link.addEventListener("click", handleLinkClick)
        );

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            links.forEach((link) =>
                link.removeEventListener("click", handleLinkClick)
            );
        };
    }, [shouldWarn, message]);
};

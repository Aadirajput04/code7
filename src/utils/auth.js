import {
    showModal
} from "@/composables";

export const authProvider = (AuthForm) => {
    const defaultModalProps = {
        clickToClose: false,
        showClose: true,
    };

    const openAuthModal = (modalProps, authFormProps) => {
        showModal({
            name: "auth",
            ...defaultModalProps,
            ...modalProps
        }, {
            default: {
                component: AuthForm,
                bind: {
                    ...authFormProps,
                },
            },
        });
    };

    return openAuthModal;
};
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

export const defaultToastOptions = {
    delay: 2000,
    position: "top",
};

export const install = ({
    app
}) => {
    app.use(VueToast, defaultToastOptions);
};
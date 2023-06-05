import UiModal from "^/components/ui/UiModal/UiModal.vue";

export const showModal = async (bind = {}, slots = {}, on = {}) => {
    const {
        $vfm
    } = await
    import ("vue-final-modal");

    // See https://vue-final-modal.org/dynamic-modal#advanced for more info
    $vfm ? .show({
        component: UiModal,

        bind,
        on: {
            confirm(close) {
                close()
            },
            ...on,
            cancel(close) {
                close();
            },
        },
        slots,
    });
};
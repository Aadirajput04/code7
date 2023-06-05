import {
    useMachine,
    useActor
} from "@xstate/vue";
import {
    watchService
} from "@/utils/machine-helpers";

export const setupMachine = (
    machine,
    label = "",
    options = {},
    watch = true
) => {
    if (!machine) {
        console.error(`setupMachine can't init for ${label}`);
        return false;
    }

    const {
        state,
        send,
        service
    } = useMachine(machine, options);

    if (watch) watchService(service, label);

    return {
        state,
        send,
        service,
    };
};

export const setupActor = (actor, label = "", watch = false) => {
    if (!actor) {
        console.error(`setupActor can't init for ${label}`);
        return false;
    }

    const {
        state,
        send
    } = useActor(actor);

    if (watch) {
        watchService(actor, label);
    }
    return {
        state,
        send,
    };
};
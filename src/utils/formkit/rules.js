export const checkNakedUrl = (node) => {
    if (!node) return false;
    return !node ? .value ? .includes('www.')
};

export const checkValidDomain = (node) => {
    if (!node) return false;
    return /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,15}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,15})$/.test(node ? .value);
}
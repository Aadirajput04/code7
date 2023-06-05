const setCrispValue = (id, value) => {
    // set information in crisp for user information
    if (window ? .$crisp) {
        window ? .$crisp.push(["set", "session:data", [
            [
                [id, value]
            ]
        ]]);
    }
};

const contactSupport = () => {
    if (window ? .$crisp) {
        window ? .$crisp.push(["do", "chat:open"]);
    } else {
        window.open("mailto:team@mixo.io?subject=Help with Mixo", '_blank').focus();
    }
};

export {
    contactSupport,
    setCrispValue
}
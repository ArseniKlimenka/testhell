module.exports = function onChangeHasWebsite(input, ambientProperties) {

    const dt = input.componentContext;
    if (dt && !dt.hasWebsite) {
        dt.websiteAddress = undefined;
    }

};

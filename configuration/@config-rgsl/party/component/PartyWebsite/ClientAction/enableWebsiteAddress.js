module.exports = function enableWebsiteAddress(input, ambientProperties) {

    const dt = input.componentContext;
    if (dt) {
        return dt.hasWebsite;
    }

};

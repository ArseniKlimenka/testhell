
module.exports = function filterActStateCodes(input) {
    const customData = this.view.getCustomData();
    return customData.actStateCodes;
};

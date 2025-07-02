const { periodStatus } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function enableClosePeriod(input) {
    const selection = input.context.selection;
    const allOpen = selection.every(_ => _.resultData.periodStatusId == periodStatus.OPEN);

    if (selection &&
        selection.length > 0 &&
        allOpen) {
        this.enableElement();
    }
    else { this.disableElement(); }
};

const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

module.exports = function enableDeleteItem(input) {
    const items = input.context.selection;
    const state = input.rootContext?.State?.Code;

    if (items &&
        items.length > 0 &&
        state === rsdStatusIds.DRAFT) {
        this.enableElement();
    }
    else { this.disableElement(); }
};

module.exports = function enableShowRelatedAccountingEntries(input) {
    const context = input.context;

    if (context.selection &&
        context.selection.length === 1) {
        this.enableElement();
    }
    else {
        this.disableElement();
    }
};

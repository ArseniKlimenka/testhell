module.exports = function enablePrintReportOnSelection(input) {
    const context = input.context;

    if (context.selection &&
        context.selection.length > 0) {
        this.enableElement();
    }
    else { this.disableElement(); }
};

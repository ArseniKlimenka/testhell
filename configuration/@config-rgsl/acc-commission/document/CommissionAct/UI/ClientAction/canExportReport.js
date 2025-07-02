module.exports = function canExportReport(input) {
    return !this.view.isDirty() && input.context.Number && input.context.ClientViewModel.calcAmounts.itemsCount > 0;
};

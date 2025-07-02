module.exports = function initAlocResultView(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { bankStatementItemId: input.data.resultData.bankStatementItemId } } });
    this.getCurrentView().search();
};

module.exports = function initClosedPeriodsHistoryView(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { periodId: input.data.resultData.periodId } } });
    this.getCurrentView().search();
};

const { bankStatementDirection, bankStatementItemStatusId, bankStatementItemSourceId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function onLoadFiltersContent(input) {
    if (isEmptyObject(input.context.request.data.criteria)) {
        input.context.request.data.criteria.direction = bankStatementDirection.INCOMING;
        input.context.request.data.criteria.transactionDateFrom = dateUtils.getFirstDateOfMonth();
        input.context.request.data.criteria.transactionDateTo = dateUtils.getLastDateOfMonth();
        input.context.request.data.criteria.paymentStatusIds = [
            bankStatementItemStatusId.NOT_ALLOCATED,
            bankStatementItemStatusId.PARTIALLY_ALLOCATED,
            bankStatementItemStatusId.ALLOCATED];
        input.context.request.data.criteria.paymentSourceIds = [ bankStatementItemSourceId.BANK_STATEMENT, bankStatementItemSourceId.REGISTRY ];
    }
};

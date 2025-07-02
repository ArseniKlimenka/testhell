const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onLoad(input) {
    if (isEmptyObject(input.context.request.data.criteria)) {
        input.context.request.data.criteria.isDocCorrect = true;
        input.context.request.data.criteria.transactionDateFrom = dateUtils.getFirstDateOfMonth();
        input.context.request.data.criteria.transactionDateTo = dateUtils.getLastDateOfMonth();
    }
};

const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onLoadFiltersContent(input) {
    if (isEmptyObject(input.context.request.data.criteria)) {
        input.context.request.data.criteria.reportingPeriodFrom = dateUtils.getFirstDateOfMonth();
        input.context.request.data.criteria.reportingPeriodTo = dateUtils.getLastDateOfMonth();
    }
};

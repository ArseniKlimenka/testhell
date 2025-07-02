const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function onLoadFiltersContent(input) {
    if (isEmptyObject(input.context.request.data.criteria)) {
        input.context.request.data.criteria.hasCommAmountLc = true;
    }
};

'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.productCode = input.PRODUCT_CODE;
    output.strategyDescription = input.STRATEGY_DESCRIPTION;
    output.strategyCode = input.STRATEGY_CODE;
    output.recommendationDateFrom = input.RECOMMENDATION_DATE_FROM;
    output.recommendationDateTo = input.RECOMMENDATION_DATE_TO;
    output.recommendationText = input.RECOMMENDATION_TEXT;

    return output;

};

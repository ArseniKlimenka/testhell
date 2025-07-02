module.exports = function resultMapping(input) {
    return {
        actId: input.ACT_ID,
        actNo: input.ACT_NO,
        stateCode: input.STATE_CODE,
        reportingPeriodFrom: input.REPORTING_PERIOD_FROM,
        reportingPeriodTo: input.REPORTING_PERIOD_TO,
        productGroupInclude: input.PRODUCT_GROUP_INCLUDE,
        productGroupExclude: input.PRODUCT_GROUP_EXCLUDE,
        includedProducts: input.INCLUDED_PRODUCTS ? JSON.parse(input.INCLUDED_PRODUCTS).map(_ => _.CODE) : undefined,
        excludedProducts: input.EXCLUDED_PRODUCTS ? JSON.parse(input.EXCLUDED_PRODUCTS).map(_ => _.CODE) : undefined,
    };
};

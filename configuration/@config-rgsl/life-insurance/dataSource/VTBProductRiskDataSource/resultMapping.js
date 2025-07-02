'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.configurationVersion = input.VERSION;
    output.salesSegment = input.SALES_SEGMENT;
    output.productType = input.PRODUCT_GROUP;
    output.productCode = input.PRODUCT_CODE;
    output.productName = input.PRODUCT_DESCRIPTION;
    output.riskCode = input.RISK_CODE;
    output.riskShortDescription = input.RISK_SHORT_DESCRIPTION;
    output.riskFullDescription = input.RISK_FULL_DESCRIPTION;
    output.riskMandatory = input.RISK_MANDATORY;
    output.partnerCode = input.PARTNER_CODE;
    output.partnerBusinessCode = input.PARTNER_BUSINESS_CODE;
    output.productCloseDate = input.PRODUCT_CLOSE_DATE;

    return output;

};

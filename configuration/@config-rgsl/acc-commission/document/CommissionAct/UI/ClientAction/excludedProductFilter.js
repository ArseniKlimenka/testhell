const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function excludedProductFilter(input, ambientProperties) {
    const body = input.context.Body;
    const productGroup = body.products.excludedGroup;
    const issueDate = body.actIssueDate;
    const partnerBusinessCode = body.agentBusinessCode;

    return getInsuranceProductFilter(ambientProperties, input.items, productGroup, partnerBusinessCode, issueDate, false, {});
};

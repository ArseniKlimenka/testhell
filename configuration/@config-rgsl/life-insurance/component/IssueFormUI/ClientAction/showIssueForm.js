'use strict';

module.exports = function showIssueForm(input) {

    const body = input.additionalContext.body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;

    if (!productCode || !issueDate) {
        return false;
    }

    const productConf = body?.productConfiguration;
    const paperTypes = productConf?.paperTypes || [];

    if (paperTypes.length <= 1) {
        return false;
    }

    return true;

};

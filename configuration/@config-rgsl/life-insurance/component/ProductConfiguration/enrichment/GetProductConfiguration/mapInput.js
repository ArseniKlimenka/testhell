'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;

    if (!productCode || !issueDate) { return null; }

    const output = {
        data: {
            criteria: {
                maxVersion: true,
                productCode,
                issueDate
            }
        }
    };

    return output;
};

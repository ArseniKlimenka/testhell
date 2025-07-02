'use strict';

module.exports = function mapping(input, sinkExchange) {
    const body = input.request ? JSON.parse(input.request).Data : {};
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    sinkExchange.mapContext('body', body);

    return {
        input: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    issueDate
                }
            }
        }
    };
};

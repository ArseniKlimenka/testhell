'use strict';

module.exports = function mapping(input, sinkExchange) {

    const issueDate = sinkExchange.stateBody.basicConditions.issueDate;
    const productCode = sinkExchange.stateBody.mainInsuranceConditions.insuranceProduct.productCode;

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

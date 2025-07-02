'use strict';

module.exports = function mapping(input, sinkExchange) {

    const productCode = sinkExchange.productCode;
    const issueDate = sinkExchange.issueDate;
    const insuranceTerms = sinkExchange.insuranceTerms;

    if (!productCode || !issueDate) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode: productCode,
                    issueDate: issueDate,
                    insuranceTerms: insuranceTerms
                }
            }
        }
    };

};

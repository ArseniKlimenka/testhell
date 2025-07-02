'use strict';

module.exports = function mapping(input, sinkExchange) {

    const issueDate = input.issueDate;
    const productCode = input.productCode;

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

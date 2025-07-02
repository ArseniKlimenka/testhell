'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const issueDate = sinkInput.policyIssueDate;
    const productCode = sinkInput.policyProductCode;

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

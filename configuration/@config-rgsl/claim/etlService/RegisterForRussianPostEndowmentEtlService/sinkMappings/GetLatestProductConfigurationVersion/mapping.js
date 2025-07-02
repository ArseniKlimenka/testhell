'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const policyIssueDate = sinkInput.policyIssueDate;
    const policyProductCode = sinkInput.policyProductCode;

    return {
        input: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode: policyProductCode,
                    issueDate: policyIssueDate
                }
            }
        }
    };

};

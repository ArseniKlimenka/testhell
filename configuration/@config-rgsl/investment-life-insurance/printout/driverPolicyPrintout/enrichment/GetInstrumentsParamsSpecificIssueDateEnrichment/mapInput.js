'use strict';

module.exports = function mapping(input) {

    const productCode = input.productCode;
    const strategyCode = input.strategyCode;
    const issueDate = input.issueDate;

    let specificIssueDate = issueDate;

    if (issueDate == '2021-12-29') {

        specificIssueDate = '2022-01-01';
    }

    const output = {
        data: {
            criteria: {
                maxVersion: true,
                productCode: productCode,
                strategyCode: strategyCode,
                issueDate: specificIssueDate,
            }
        }
    };

    return output;
};

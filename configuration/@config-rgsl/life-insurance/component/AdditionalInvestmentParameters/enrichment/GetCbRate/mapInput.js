'use strict';

module.exports = function mapping(input) {

    const body = this?.businessContext?.rootData;
    const issueDate = body.basicConditions.issueDate;

    if (!issueDate) {
        return;
    }

    return {
        data: {
            criteria: {
                dateFrom: issueDate,
                dateTo: issueDate
            }
        }
    };

};

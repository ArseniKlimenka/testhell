'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.attributes = {
        mainAttributes: input.mainAttributes,
        claimDates: input.claimDates,
        approvalConclusions: input.approvalConclusions
    };

    return commonBody;
};

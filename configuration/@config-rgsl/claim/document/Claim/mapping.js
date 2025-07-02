'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.attributes = {
        mainAttributes: input.mainAttributes,
        claimDates: input.claimDates,
        claimAmounts: input.claimAmounts,
        claimBeneficiaries: input.claimBeneficiaries,
        approvalConclusions: input.approvalConclusions
    };

    return commonBody;
};

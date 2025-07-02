'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.attributes = {
        mainAttributes: input.mainAttributes,
        endowmentAmounts: input.endowmentAmounts,
        endowmentBeneficiaries: input.endowmentBeneficiaries,
        endowmentPaymentVariant: input.endowmentPaymentVariant,
        endowmentPaymentFrequency: input.endowmentPaymentFrequency,
        approvalRequests: input.approvalRequests,
        approvalConclusions: input.approvalConclusions
    };

    return commonBody;
};

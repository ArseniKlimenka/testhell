'use strict';

const { defaultEndowmentBeneficiaryReason, defaultEndowmentBeneficiaryPaymentType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function setDefaultBeneficiaryValues(input, ambientProperties) {

    input.affectedRow.beneficiaryReason = defaultEndowmentBeneficiaryReason;
    input.affectedRow.beneficiaryPaymentType = defaultEndowmentBeneficiaryPaymentType;
    return true;
};

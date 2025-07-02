'use strict';
const { defaultClaimBeneficiaryReason, defaultClaimBeneficiaryPaymentType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function setDefaultBeneficiaryValues(input) {

    input.affectedRow.beneficiaryReason = defaultClaimBeneficiaryReason;
    input.affectedRow.beneficiaryPaymentType = defaultClaimBeneficiaryPaymentType;
    return true;
};

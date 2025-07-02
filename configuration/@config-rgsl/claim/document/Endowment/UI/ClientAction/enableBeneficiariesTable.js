'use strict';
const { endowmentStatesToDisableBeneficiaries } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function enableBeneficiariesTable(input, context) {

    const stateCode = context.State?.Code;
    const contract = input.rootContext.Body.mainAttributes?.contract?.number;

    return !!contract && !endowmentStatesToDisableBeneficiaries.includes(stateCode);
};

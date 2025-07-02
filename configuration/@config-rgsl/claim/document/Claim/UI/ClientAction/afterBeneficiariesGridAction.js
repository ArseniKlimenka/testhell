'use strict';

const { claimStatesToValidateBankAccounts } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function afterBeneficiariesGridAction(input, ambientProperties) {

    const beneficiaries = input.context.Body.claimBeneficiaries;
    const stateCode = input.context.State?.Code;

    if (!beneficiaries || beneficiaries.length === 0) {

        delete input.context.Body.tempTechnicalData.beneficariesBankAccounts;
    }
    else if (claimStatesToValidateBankAccounts.includes(stateCode)) {

        await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

'use strict';
const { endowmentStatesToValidateBankAccounts } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function afterSaveDocumentAction(input) {

    await this.view.evaluate(['[GetPolicyParties]'], false, true);
    await this.view.evaluate(['[GetParticipantsData]'], false, true);
    await this.view.evaluate(['[GetDuplicatedEndowments]'], false, true);
    await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);
    await this.view.evaluate(['[SetEndowmentInquiries]'], false, true);

    const stateCode = input.context.State?.Code;

    if (endowmentStatesToValidateBankAccounts.includes(stateCode)) {

        await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);
    }

    this.view.setClean();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

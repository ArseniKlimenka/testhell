'use strict';

const { fillInjuriesNotes } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = async function afterSaveDocumentAction(input) {

    this.view.startBlockingUI();

    await this.view.evaluate(['[GetDuplicatedClaims]'], false, true);
    await this.view.evaluate(['[GetPolicyParties]'], false, true);
    await this.view.evaluate(['[GetPolicyCancellationData]'], false, true);
    await this.view.evaluate(['[GetPolicyOpenAmountData]'], false, true);
    await this.view.evaluate(['[GetPolicyTempData]'], false, true);
    await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);

    const injuries = input.context.Body.mainAttributes?.riskAdditionalAttributes?.injuries ?? [];

    if (injuries.length > 0) {

        const injuriesCodes = injuries.map(item => item.injuryDetails.code);
        fillInjuriesNotes(input.context.Body, injuriesCodes);
    }

    this.view.setClean();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};

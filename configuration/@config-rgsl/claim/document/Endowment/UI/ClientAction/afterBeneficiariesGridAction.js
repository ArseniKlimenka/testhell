'use strict';

module.exports = async function afterBeneficiariesGridAction(input, ambientProperties) {


    this.view.startBlockingUI();

    const beneficiaries = input.context.Body.endowmentBeneficiaries;

    if (!beneficiaries || beneficiaries.length === 0) {

        delete input.context.Body.tempTechnicalData.beneficariesBankAccounts;
    }
    else {

        await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);
    }

    await this.view.evaluate(['[GetPolicyPaymentInfo]'], false, true);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};

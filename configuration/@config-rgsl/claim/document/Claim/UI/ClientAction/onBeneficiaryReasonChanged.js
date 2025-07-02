'use strict';

module.exports = async function onBeneficiaryReasonChanged(input) {

    const reason = input.rowContext?.beneficiaryReason?.code;

    if (!reason) {

        delete input.data.fullName;
        delete input.data.partyCode;
        delete input.data.partyType;
        delete input.data.bankAccount;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

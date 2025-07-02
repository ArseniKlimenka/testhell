'use strict';

const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function onChangeTypesChanged(input) {

    const currentChangeTypes = input.componentContext.changeTypes || [];
    const isPolicyHolder = input.context.Body.insuredPerson.isPolicyHolder;

    if (isPolicyHolder && currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit) &&
     !currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit)) {

        currentChangeTypes.push(changeTypes.insuredPersonPersonalDataEdit);
    }

    if (isPolicyHolder && currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) &&
     !currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit)) {

        currentChangeTypes.push(changeTypes.policyHolderPersonalDataEdit);
    }

    if (!currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) &&
        !currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit) &&
        !currentChangeTypes.includes(changeTypes.beneficiaryEdit)) {

        input.componentContext.personalDataChangeType = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

'use strict';

const { copyPolicyHolderData, copyInsuredDataToBeneficiary, refreshView } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = async function copyPolicyHolderAction(input) {

    copyPolicyHolderData(input);
    await copyInsuredDataToBeneficiary(this);

    refreshView(this.view);
};

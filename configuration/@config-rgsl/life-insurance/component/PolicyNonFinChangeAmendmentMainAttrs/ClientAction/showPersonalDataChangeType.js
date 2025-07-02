'use strict';

const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function showPersonalDataChangeType(input) {

    const currentChangeTypes = input.componentContext.changeTypes || [];

    return currentChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) ||
           currentChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit) ||
           currentChangeTypes.includes(changeTypes.beneficiaryEdit);
};

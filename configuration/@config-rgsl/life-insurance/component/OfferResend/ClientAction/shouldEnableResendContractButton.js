'use strict';
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldEnableResendContractButton(input, ambientProperties) {

    const state = input.context.State.Code;
    const issueForm = getValue(input.context.Body, 'issueForm.code.issueFormCode');
    const productCode = getValue(input.context.Body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const currentActor = input.context.WorkUnitActor.CurrentActor;

    if (issueForm == 'offer' &&
        productCode == 'CACB' &&
        [policyState.Draft, policyState.Active, policyState.Activated].includes(state) &&
        currentActor != 'Viewer'
    ) {

        return true;
    }

    return false;
};



'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function disableLookUpInputs(input, ambientProperties) {

    const createdFromPolicy = getValue(input, 'context.Body.technicalInformation.createdFromPolicy');
    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((areElementsDisabled(this.view) && !amendmentType) ||
        (createdFromPolicy && input?.data?.participantType == 'policyHolder') ||
        amendmentType === changeAmendmentTypes.financialChange) {

        return true;
    }

    const parentComponent = this.getParentComponent() || {};
    const isPolicyHolder = getValue(parentComponent, 'context.isPolicyHolder');

    if (isPolicyHolder) {

        return true;
    }


    return false;

};

function areElementsDisabled(view) {

    return !isSaveOperationAvailable(view) || view.areAllElementsDisabled();
}

'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableLookUpInputs(input, ambientProperties) {

    const createdFromPolicy = getValue(input, 'context.Body.technicalInformation.createdFromPolicy');
    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return false;
    }

    if ((areElementsDisabled(input, this.view) && !amendmentType) ||
        (createdFromPolicy && input?.data?.participantType == 'policyHolder') ||
        (amendmentType === changeAmendmentTypes.financialChange && isDisabledForChangeAmendment(input, state)) ||
        (!!amendmentType && amendmentType !== changeAmendmentTypes.financialChange)) {

        return true;
    }

    const parentComponent = this.getParentComponent() || {};
    const isPolicyHolder = getValue(parentComponent, 'context.isPolicyHolder');

    if (isPolicyHolder) {

        return true;
    }


    return false;

};

function areElementsDisabled(input, view) {

    return !isSaveOperationAvailable(view) || view.areAllElementsDisabled() || shouldDisableSaveableContract(input, view);
}

function isDisabledForChangeAmendment(input, state) {

    const amendmentData = input.context.Body.amendmentData.finChangeAmendmentData;

    if (!amendmentData) {

        return true;
    }

    const selectedChangeTypes = amendmentData.mainAttributes.changeTypes ?? [];

    return !['Draft', 'OperationsApproval'].includes(state) || !selectedChangeTypes.includes(changeTypes.policyHolderChange);
}

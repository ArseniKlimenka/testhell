'use strict';

const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableIsPolicyHolder(input) {

    const body = input?.context?.Body;

    const policyHolderPartyType = body?.policyHolder?.partyData?.partyType;

    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return false;
    }

    if (policyHolderPartyType == partyType.LegalEntity) {
        return true;
    }

    const amendmentType = input.context.Dimensions.amendmentType;

    if (!isSaveOperationAvailable(this.view) ||
        shouldDisableSaveableContract(input, this.view) ||
        (this.view.areAllElementsDisabled() && !amendmentType) ||
        (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return true;
    }

    const amendmentData = body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    if (amendmentType) {

        if (state === 'OperationsApproval') {
            return !selectedChangeTypes.includes(changeTypes.policyHolderChange);
        }

        return true;
    }

    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy) {
        return true;
    }

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    if (productGroupArray.MO_DMS.includes(productCode)) {
        return true;
    }

    return body?.productConfiguration?.insuredIsPolicyHolder;

};

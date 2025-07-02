'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableRiskInsuredSum(input, ambientProperties) {

    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return true;
    }

    const amendmentType = input.context.Dimensions.amendmentType;


    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || shouldDisableSaveableContract(input, this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.financialChange)) {

        return false;
    }

    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    let enabledByAmendment = true;

    if (amendmentType) {

        if (state === 'Draft' || state === 'OperationsApproval') {

            enabledByAmendment = selectedChangeTypes.includes(changeTypes.insuredSumAndPaymentEdit);
        }
        else {

            enabledByAmendment = false;
        }
    }


    const body = input.context.Body;

    const amendmentIssueDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate;
    const productConfOnAmendmentDate = input.amendment?.attributes?.productConfOnAmendmentDate;
    const contractIssueDate = input.componentContext.issueDate;

    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = contractIssueDate ?? DateTimeUtils.newDateAsString();
    }
    else {

        productConfDate = amendmentIssueDate ?? DateTimeUtils.newDateAsString();
    }

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate: productConfDate }) : body?.productConfiguration;

    let enabledByProduct = true;

    if (productConf && productConf.disableRiskInsuredSum) {

        enabledByProduct = false;
    }

    return enabledByAmendment && enabledByProduct;
};

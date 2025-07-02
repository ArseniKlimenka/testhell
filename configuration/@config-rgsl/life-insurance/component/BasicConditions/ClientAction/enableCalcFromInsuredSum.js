'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');

module.exports = function enableCalcFromInsuredSum(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

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
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!productCode) {

        return false;
    }

    const amendmentIssueDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate ?? dateTimeUtils.newDateAsString();
    const productConfOnAmendmentDate = input.amendment?.attributes?.productConfOnAmendmentDate;
    const contractIssueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = contractIssueDate;
    }
    else {

        productConfDate = amendmentIssueDate;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate: productConfDate }) : body?.productConfiguration;

    const allowCalcFromInsuredSum = productConf?.allowCalcFromInsuredSum;
    const allowCalcFromPremium = productConf?.allowCalcFromPremium;
    let enabledByProduct = true;

    if ((allowCalcFromInsuredSum && !allowCalcFromPremium) || (!allowCalcFromInsuredSum && allowCalcFromPremium)) {

        enabledByProduct = false;
    }

    return enabledByAmendment && enabledByProduct;
};

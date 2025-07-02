'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function risksCheckIfAddButtonVisible(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    const productConfOnAmendmentDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.productConfOnAmendmentDate;
    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = body.basicConditions?.issueDate || dateTimeUtils.newDateAsString();
    }
    else {

        productConfDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate;
    }

    if (!productCode) {

        return false;
    }

    const productConf = body?.productConfiguration;

    if (!productConf) {

        return false;
    }

    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    const amendmentType = input.context.Dimensions.amendmentType;
    const stateCode = input.context.State.Code;
    const isAllowedToChangeByAmendment =
        amendmentType === changeAmendmentTypes.financialChange
        && (stateCode === 'Draft' || stateCode === 'OperationsApproval')
        && selectedChangeTypes.includes(changeTypes.riskEdit);

    return productConf.canHaveAdditionalRisks || isAllowedToChangeByAmendment;
};

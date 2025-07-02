'use strict';

/* eslint no-undef: "off"*/
const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { amountConsts, claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} claimShouldBeSentToLegalAndSecurity
 * @errorCode {errorCode} policyIsNotPaidAtEventDate
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.collectiveClaim, validationErrors);

    const processedByLegal = input.commonBody.transitionResult?.processedByLegal ?? false;
    const processedBySecurity = input.commonBody.transitionResult?.processedBySecurity ?? false;

    if (input.body.claimAmounts.paymentAmountInRubCurrency > amountConsts.legalAndSecurityApproval &&
        (!processedByLegal || !processedBySecurity)) {

        validationErrors.push({
            errorCode: 'claimShouldBeSentToLegalAndSecurity',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }

    const enrich = documents.getDocumentConfiguration(claimConfigurantionNames.collectiveClaim, '1').processEnrichmentsFn;
    enrich(input.body, ['[GetPolicyOpenAmountData]']);

    const policyOpenAmounts = input.body.tempTechnicalData?.policyOpenAmounts ?? [];
    const firstPeriod = policyOpenAmounts.find(item => item.periodNumber === 1);

    if (policyOpenAmounts === 0 || !firstPeriod || firstPeriod.openAmount > 0) {

        validationErrors.push({
            errorCode: 'policyIsNotPaidAtEventDate',
            errorDataPath: '/Body/mainAttributes/contract/number'
        });
    }

    return validationErrors;
};

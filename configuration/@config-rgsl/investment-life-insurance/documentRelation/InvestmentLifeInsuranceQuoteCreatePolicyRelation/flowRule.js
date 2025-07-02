const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const insuredPersonHelper = require('@config-rgsl/life-insurance/lib/insuredPersonHelper');

/**
 * @errorCode {errorCode} CreatePolicyRestrictionByDate
 * @errorCode {errorCode} CreatePolicy_BlockTrigger
 * @errorCode {errorCode} CreatePolicy_NeedReview
 * @errorCode {errorCode} CreatePolicy_AgentDoesntHaveAccess
 */

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions.insuranceProduct?.productCode;
    const isAgent = this.applicationContext.actor == 'Agent';
    if (isNoteProduct(productCode) && isAgent) {
        return {
            errorCode: 'CreatePolicy_AgentDoesntHaveAccess'
        };
    }

    const documentState = this.businessContext.documentState;
    const applicationRoles = this?.applicationContext?.user?.applicationRoles;
    const isSpecificSales = applicationRoles && applicationRoles.some(t => t == 'SpecificSales');

    if (!isNoteProduct(productCode)) {

        if (documentState == 'Approved') {

            const firstPaymentExpirationDate = body.paymentPlan[0]?.paymentExpirationDate;

            if (DateTimeUtils.isBefore(firstPaymentExpirationDate)) {
                if (typeof window == "undefined" && !isSpecificSales) { // for testing
                    return {
                        errorCode: 'CreatePolicyRestrictionByDate'
                    };
                }
            }
        }

    }

    if (documentState == 'Draft') {
        if (flowRulesHelper.existsTrigger(body, 'block')) {
            return {
                errorCode: 'CreatePolicy_BlockTrigger'
            };
        }

        if (flowRulesHelper.existsTrigger(body)) {
            return {
                errorCode: 'CreatePolicy_NeedReview'
            };
        }

    }

    return true;
};

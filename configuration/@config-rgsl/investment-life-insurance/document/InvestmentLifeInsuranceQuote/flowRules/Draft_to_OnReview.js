const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { canGenerateNotePolicyNumberService, checkDRPKCommissionIncrease } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} Draft_to_OnReview_BlockTrigger
 * @errorCode {errorCode} Draft_to_OnReview_NoTriger
 * @errorCode {errorCode} Draft_to_OnReview_ApplicationAttachment
 * @errorCode {errorCode} Draft_to_OnReview_ShouldHaveFutureContractNumber
 * @errorCode {errorCode} Draft_to_OnReview_managingDirectorDRPKAttachmentIsRequired
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    const input = {};
    input.context = {};
    input.context.Body = body;
    input.context.ValidationResult = commonBody.validations;
    const attachmentsPackage = body?.attachmentsPackage ?? [];
    const rateOfReturn = body?.basicInvestmentParameters?.rateOfReturn;

    if (canGenerateNotePolicyNumberService(input, this)) {

        return {
            errorCode: 'Draft_to_OnReview_ShouldHaveFutureContractNumber'
        };
    }

    // triggers checks
    if (flowRulesHelper.existsTrigger(body, 'block')) {

        return {
            errorCode: 'Draft_to_OnReview_BlockTrigger'
        };
    }

    if (!flowRulesHelper.existsTrigger(body)) {

        return {
            errorCode: 'Draft_to_OnReview_NoTriger'
        };
    }

    // attachments checks
    const hasOnlyUkspTrigger = body?.uwTriggers?.every(element => element.departament == 'UKSP');
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!hasOnlyUkspTrigger) {

        const entityId = this?.businessContext?.entityId;
        const isNOTEV1BFKO = productCode == product.NOTEV1BFKO;
        const isRateOfReturn = productGroupArray.RATE_OF_RETURN.includes(productCode);
        const isRateOfReturnPremiumLimit = productGroupArray.RATE_OF_RETURN_PREMIUM_LIMIT.includes(productCode);
        const isAddTriger = productGroupArray.FOR_ADD_TRIGGER_DRAFT_TO_ONREVIEW_APPLICATIONATTACHMENT.includes(productCode);
        const isRateOfReturnCondition = productGroupArray.IDG_VTB.includes(productCode)
            && (flowRulesHelper.existsTrigger(body, 'underwriting') || flowRulesHelper.existsTrigger(body, 'compliance'));

        if (isRateOfReturnCondition || isAddTriger || (!isNOTEV1BFKO && !isRateOfReturn && !isRateOfReturnPremiumLimit)) {

            if (!flowRulesHelper.existsAttachment(body, entityId, 'application')) {

                return {
                    errorCode: 'Draft_to_OnReview_ApplicationAttachment'
                };
            }
        }
    }
    const isREINVEST = productGroupArray.REINVEST_PRODUCT_FOR_SKIP_DRPK.includes(productCode);
    const isDRPKCaseOfIncrease = checkDRPKCommissionIncrease(productCode, body?.commission?.policyCommissionItems);

    if (!isREINVEST && rateOfReturn && !attachmentsPackage.some(item => item.attachmentType == 'managingDirectorDRPK') && !isDRPKCaseOfIncrease) {

        return {
            errorCode: 'Draft_to_OnReview_managingDirectorDRPKAttachmentIsRequired'
        };
    }

    return true;
};

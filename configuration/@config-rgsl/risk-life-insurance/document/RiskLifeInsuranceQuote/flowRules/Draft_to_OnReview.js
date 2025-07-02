const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { canGenerateNotePolicyNumberService } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

/**
 * @errorCode {errorCode} Draft_to_OnReview_BlockTrigger
 * @errorCode {errorCode} Draft_to_OnReview_NoTriger
 * @errorCode {errorCode} Draft_to_OnReview_ApplicationAttachment
 * @errorCode {errorCode} Draft_to_OnReview_ShouldHaveFutureContractNumber
 * @errorCode {errorCode} Draft_to_OnReview_ReceiptAttachment
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    const input = {};
    input.context = {};
    input.context.Body = body;
    input.context.ValidationResult = commonBody.validations;

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

    if (canGenerateNotePolicyNumberService(input, this)) {
        return {
            errorCode: 'Draft_to_OnReview_ShouldHaveFutureContractNumber'
        };
    }

    // attachments checks
    const entityId = getValue(this, 'businessContext.entityId');
    if (!flowRulesHelper.existsAttachment(body, entityId, 'application')) {
        return {
            errorCode: 'Draft_to_OnReview_ApplicationAttachment'
        };
    }

    // Временное решение от бизнеса

    // if (!flowRulesHelper.existsAttachment(body, entityId, 'Receipt')) {
    //     return {
    //         errorCode: 'Draft_to_OnReview_ReceiptAttachment'
    //     };
    // }

    return true;

};

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

/**
 * @errorCode {errorCode} Draft_to_OnReview_BlockTrigger
 * @errorCode {errorCode} Draft_to_OnReview_NoTriger
 * @errorCode {errorCode} Draft_to_OnReview_ApplicationAttachment
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

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
    const entityId = getValue(this, 'businessContext.entityId');
    if (!flowRulesHelper.existsAttachment(body, entityId, 'application')) {
        return {
            errorCode: 'Draft_to_OnReview_ApplicationAttachment'
        };
    }

    return true;

};

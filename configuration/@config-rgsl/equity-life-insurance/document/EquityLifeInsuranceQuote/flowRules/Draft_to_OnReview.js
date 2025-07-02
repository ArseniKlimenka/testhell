const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

/**
 * @errorCode {errorCode} Draft_to_OnReview_BlockTrigger
 * @errorCode {errorCode} Draft_to_OnReview_NoTriger
 * @errorCode {errorCode} Draft_to_OnReview_ApplicationAttachment
 * @errorCode {errorCode} Draft_to_OnReview_formSeventyPlus
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
    const validationErrors = [];
    const triggersCount = flowRulesHelper.getTriggersCount(body);
    const existsTrigger70 = flowRulesHelper.existsTrigger(body, undefined, 'Котировка должна быть направлена на согласование в СК "Страхователь 70 или более лет"');
    const existsTriggerUnderwriting = flowRulesHelper.existsTrigger(body, 'underwriting', 'Договор должен быть направлен на согласование СК');

    if (!(triggersCount == 1 && (existsTrigger70 || existsTriggerUnderwriting))) {
        const entityId = this?.businessContext?.entityId;
        if (!flowRulesHelper.existsAttachment(body, entityId, 'application')) {
            validationErrors.push({
                errorCode: 'Draft_to_OnReview_ApplicationAttachment'
            });
        }
    }

    if (existsTrigger70) {
        const entityId = this?.businessContext?.entityId;
        if (!flowRulesHelper.existsAttachment(body, entityId, 'formSeventyPlus')) {
            validationErrors.push({
                errorCode: 'Draft_to_OnReview_formSeventyPlus'
            });
        }
    }

    return validationErrors;

};

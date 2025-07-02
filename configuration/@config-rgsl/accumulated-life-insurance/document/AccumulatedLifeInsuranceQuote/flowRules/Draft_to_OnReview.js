const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} Draft_to_OnReview_BlockTrigger
 * @errorCode {errorCode} Draft_to_OnReview_NoTriger
 * @errorCode {errorCode} Draft_to_OnReview_ApplicationAttachment
 * @errorCode {errorCode} EBMGRETVTB_product
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGNRETVTB, product.WCEN3OAS].includes(productCode);
    if (isEBMGRETVTB) {
        return {
            errorCode: 'EBMGRETVTB_product'
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

    const hasOnlyUkspTrigger = body.uwTriggers?.every(element => element.departament == 'UKSP');

    // attachments checks
    if (!hasOnlyUkspTrigger) {
        const entityId = this?.businessContext?.entityId;
        if (!flowRulesHelper.existsAttachment(body, entityId, 'application')) {
            return {
                errorCode: 'Draft_to_OnReview_ApplicationAttachment'
            };
        }
    }

    return true;
};

const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

/**
 * @errorCode {errorCode} Activated_to_Cancelled_HasAllocations
 */

module.exports = function rule(input) {

    const validationErrors = [];

    if (flowRulesHelper.hasAllocations(input.body)) {
        validationErrors.push({
            errorCode: "Activated_to_Cancelled_HasAllocations"
        });
    }

    return validationErrors;

};

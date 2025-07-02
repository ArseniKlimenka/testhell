const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

/**
 * @errorCode {errorCode} Cancelled_to_Active_WasNotActive
 */

module.exports = function rule(input) {

    const validationErrors = [];
    const commonBody = getValue(input, 'commonBody');

    if (!flowRulesHelper.wasActive(commonBody)) {
        validationErrors.push({
            errorCode: "Cancelled_to_Active_WasNotActive"
        });
    }

    return validationErrors;

};

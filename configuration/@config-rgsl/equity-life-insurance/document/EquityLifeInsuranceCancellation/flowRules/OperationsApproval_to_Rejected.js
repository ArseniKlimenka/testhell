const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

/**
 * @errorCode {errorCode} RejectionTextIsRequired
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (!rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextIsRequired'
        });
    }

    return validationErrors;
};

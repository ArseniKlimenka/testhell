'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} PremiumCalculating_Not_Available
 */

module.exports = function rule(input) {

    const excludeValidations = [
        "premiumCalculatingRequired"
    ];

    const insuredCount = getValue(input, 'body.technicalInformation.collectivePolicyInsuredCount', 0);
    const schemaValidations = getValue(input, 'commonBody.validations.schemaValidations', []);
    const validations = schemaValidations.filter(x => x.severity == "Error" && !excludeValidations.includes(x.code));

    if (validations.length == 0 && insuredCount > 0) {
        return true;
    }

    return {
        errorCode: 'PremiumCalculating_Not_Available'
    };
};

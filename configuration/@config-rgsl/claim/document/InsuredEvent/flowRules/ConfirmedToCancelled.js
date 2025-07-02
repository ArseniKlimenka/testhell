'use strict';

const { validateExisitngClaims } = require('@config-rgsl/claim-base/lib/insuredEventValidationHelper');

/**
 * @errorCode {errorCode} insuredEventHasActiveClaims
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateExisitngClaims(input, validationErrors);

    return validationErrors;
};

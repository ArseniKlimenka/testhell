'use strict';
const { validateCancellationPoCreationTransition } = require('@config-rgsl/life-insurance/lib/amendmentValidationHelper');

/**
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    let validationErrors = [];

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextMustBeEmpty'
        });
    }

    validateCancellationPoCreationTransition(input, 'AccumulatedLifeInsuranceCancellation', validationErrors, this);

    validationErrors = validationErrors.filter(e => e.severity !== 'Warning');

    return validationErrors;
};

'use strict';
const { validateCancellationPoCreationTransition } = require('@config-rgsl/life-insurance/lib/amendmentValidationHelper');

module.exports = function rule(input) {

    let validationErrors = [];

    validateCancellationPoCreationTransition(input, 'EquityLifeInsuranceCancellation', validationErrors, this);

    validationErrors = validationErrors.filter(e => e.severity !== 'Warning');

    return validationErrors;
};

'use strict';

const { validateInsuranceEventDate } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { claimConfigurantionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} insuredEventDateOutOfRange
 * @errorCode {errorCode} RejectionReasonShouldBeEmpty
 * @errorCode {errorCode} RejectionNoteShouldBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    validateInsuranceEventDate(input, claimConfigurantionNames.claim, validationErrors);

    return validationErrors;
};

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @errorCode {errorCode} CancellationDateAlreadyReached
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextMustBeEmpty'
        });
    }

    const cancellationDate = input.body.basicAmendmentConditions?.validFrom;
    const dateNow = dateUtils.dateNow();

    if (cancellationDate <= dateNow ) {

        validationErrors.push({
            errorCode: 'CancellationDateAlreadyReached'
        });
    }

    return validationErrors;
};

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

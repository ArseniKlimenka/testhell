/**
 * @errorCode {errorCode} OnReview_to_RefusalToTerminateByPolicyholder_ModificationOnly
 * @errorCode {errorCode} PolicyShouldBeActivated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const typeOfRequest = input.body.typeOfRequest;

    if (typeOfRequest != 'Modification') {
        validationErrors.push({
            errorCode: 'OnReview_to_RefusalToTerminateByPolicyholder_ModificationOnly'
        });
    }

    return validationErrors;

};

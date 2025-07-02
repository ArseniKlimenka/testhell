/**
 * @errorCode {errorCode} OnReview_to_Correction_Empty_ReturnForRevisionReason
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const returnForRevisionReason = input.body.returnForRevisionReason;
    if (!returnForRevisionReason) {
        validationErrors.push({
            errorCode: 'OnReview_to_Correction_Empty_ReturnForRevisionReason'
        });
    }

    return validationErrors;

};

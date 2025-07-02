/**
 * @errorCode {errorCode} Draft_to_Cancelled
 */


module.exports = function rule(input) {

    const validationErrors = [];

    if (!input.body.comment) {
        validationErrors.push({
            errorCode: "Draft_to_Cancelled"
        });
    }

    return validationErrors;
};

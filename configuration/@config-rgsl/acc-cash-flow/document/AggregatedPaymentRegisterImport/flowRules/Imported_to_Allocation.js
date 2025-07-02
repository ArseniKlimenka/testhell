/**
 * @errorCode {errorCode} Imported_to_Allocation
 */

module.exports = function rule(input) {

    const validationErrors = [];
    const body = input.body;
    const canAllocate = body.bankStatementItems && body.bankStatementItems.length > 0;

    if (!canAllocate) {
        validationErrors.push({
            errorCode: "Imported_to_Allocation"
        });
    }

    return validationErrors;

};

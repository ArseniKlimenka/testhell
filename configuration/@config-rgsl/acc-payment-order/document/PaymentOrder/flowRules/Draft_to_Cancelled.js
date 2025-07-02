

/**
 * @errorCode {errorCode} restrictedToCancelNettingPo
 */
module.exports = function rule(input) {

    const validationErrors = [];
    const isCancelledNetting = input.body.paymentOrderInformation.isCreatedFromNetting ?? false;

    if (isCancelledNetting) {

        validationErrors.push({
            errorCode: 'restrictedToCancelNettingPo'
        });
    }

    return validationErrors;
};

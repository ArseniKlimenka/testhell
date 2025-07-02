'use strict';

/**
 * @errorCode {errorCode} emptyPartner
 * @errorCode {errorCode} emptyInsuranceProduct
 * @errorCode {errorCode} emptyInsuranceStartDate
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    if (!input.partner || !input.partner.partnerCode) {

        validationErrors.push({
            errorCode: "emptyPartner",
        });
    }

    if (!input.insuranceProduct || !input.insuranceProduct.length === 0) {

        validationErrors.push({
            errorCode: "emptyInsuranceProduct",
        });
    }

    if (!input.insuranceStartDate) {

        validationErrors.push({
            errorCode: "emptyInsuranceStartDate",
        });
    }

    return validationErrors;
};

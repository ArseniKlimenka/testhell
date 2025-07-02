'use strict';

const { showKIDPrintout, isSkipAttachmentsValidationAPI } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const partnerCode = input.body.mainInsuranceConditions?.partner?.partnerBusinessCode;

    if (showKIDPrintout(input, this) || isSkipAttachmentsValidationAPI(this, partnerCode, true, productCode)) {

        return true;
    }
};

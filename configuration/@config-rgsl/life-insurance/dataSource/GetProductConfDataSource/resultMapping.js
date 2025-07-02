'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.uvdNumber = input.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.stateCodeName = input.STATE_CODE_NAME;
    output.confCodeName = input.CONF_CODE_NAME;

    return output;
};

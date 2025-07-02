'use strict';

module.exports = function resultMapping(input) {

    return {
        referenceNo: input.CONTRACT_NUMBER,
        startDate: input.START_DATE,
        dueDate: input.DUE_DATE,
        holderName: input.HOLDER_NAME,
        productDescription: input.PRODUCT_DESC,
        configurationName: input.CODE_NAME,
    };
};

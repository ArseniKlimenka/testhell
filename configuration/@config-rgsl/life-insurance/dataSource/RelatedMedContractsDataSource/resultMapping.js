'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        documentNumber: input.DOCUMENT_NUMBER,
        productDescription: input.PRODUCT_DESCRIPTION,
        createdOn: input.SYS_CREATED_ON,
        configurationCodeName: input.CONTRACT_TYPE,
        documentType: translationUtils.getTranslation(`document/${input.CONTRACT_TYPE}/1`, 'rootConfiguration', 'Title', input.CONTRACT_TYPE),
        documentState: translationUtils.getTranslation(`document/${input.CONTRACT_TYPE}/1`, 'states', null, input.CONTRACT_STATE)
    };
};

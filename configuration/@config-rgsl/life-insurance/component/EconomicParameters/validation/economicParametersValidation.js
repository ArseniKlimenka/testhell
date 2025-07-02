'use strict';

const { validateMainDocumentData } = require('@config-rgsl/life-insurance/lib/economicParametersValidationHelper');

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    if (this.businessContext.configurationCodeName != "ContractEntity") {
        validateMainDocumentData(input, this, validationErrors, []);
    }

    return validationErrors;
};

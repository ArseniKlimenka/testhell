'use strict';

const { validateMainDocumentData } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    validateMainDocumentData(input, validationErrors);

    return validationErrors;
};

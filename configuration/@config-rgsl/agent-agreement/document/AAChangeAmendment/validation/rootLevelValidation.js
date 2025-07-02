'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { validateMainDocumentData } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');

/**
 * @errorCode {errorCode} AmendmentManualDocumentNumberIsRequired
 * */
module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    validateMainDocumentData(input, validationErrors);
    validateChangeAmendmentData(input, validationErrors);

    return validationErrors;
};

function validateChangeAmendmentData(input, validationErrors) {

    if (!getValue(input, 'amendmentData.changeAmendmentData.manualDocumentNumber')) {

        validationErrors.push({
            errorCode: 'AmendmentManualDocumentNumberIsRequired',
            errorDataPath: '/Body/amendmentData/changeAmendmentData/manualDocumentNumber'
        });
    }
}

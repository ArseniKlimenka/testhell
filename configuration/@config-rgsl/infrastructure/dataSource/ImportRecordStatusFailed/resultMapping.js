'use strict';

const { parseHighlightedErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = function resultMapping(input) {

    const errors = JSON.parse(input.ERRORS);
    errors.errorMessage = parseHighlightedErrorMessage(errors.errorMessage);

    const ret = {
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        sourceId: input.SOURCE_ID,
        recordKey: input.RECORD_KEY,
        errors: errors,
        resultSummary: input.RESULT_SUMMARY ? JSON.parse(input.RESULT_SUMMARY) : {},
        validationResult: errors?.validationResult ? JSON.stringify(errors.validationResult) : ''
    };

    return ret;
};

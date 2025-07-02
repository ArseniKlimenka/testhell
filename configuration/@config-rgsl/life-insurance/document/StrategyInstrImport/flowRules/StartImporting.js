'use strict';

/* eslint no-undef: "off"*/
/**
 * @errorCode {errorCode} excelLoadErrors
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const enrich = documents.getDocumentConfiguration("StrategyInstrImport", 1).processEnrichmentsFn;
    enrich(undefined, input, ['[GetLoadedDataErrors]']);

    if (input.errorsOnLoadExcel) {
        validationErrors.push({
            errorCode: "excelLoadErrors",
            errorMessage: 'E: Fix errors in excel file!',
        });
    }

    return validationErrors;

};


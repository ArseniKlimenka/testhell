'use strict';

const { objectToString } = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function resultMapping(input) {

    const dataJson = input.DATA;
    let dataObject = JSON.parse(dataJson);
    const attributesToString = this?.businessContext?.data?.criteria?.attributesToString;

    if (attributesToString?.length > 0) {
        dataObject = objectToString(dataObject, attributesToString);
    }

    const ret = {
        importDocumentId: input.IMPORT_DOCUMENT_ID,
        importDocumentNumber: input.IMPORT_DOCUMENT_NUMBER,
        sourceId: input.SOURCE_ID,
        recordKey: input.RECORD_KEY,
        data: dataObject
    };

    return ret;
};

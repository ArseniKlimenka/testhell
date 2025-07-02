'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;
    if (!criteria ||
        (!criteria.universalDocumentNumber &&
        !criteria.universalDocumentId &&
        !criteria.universalDocumentNumbers)) {
        throw 'Criteria was not defined!';
    }

    const output = {
        parameters: {
            universalDocumentNumber: criteria.universalDocumentNumber,
            universalDocumentName: criteria.universalDocumentName,
            universalDocumentState: criteria.universalDocumentState,
            universalDocumentId: criteria.universalDocumentId,
            universalDocumentNumbers: criteria.universalDocumentNumbers,
        },
        sort: {
            'UNIVERSAL_DOCUMENT_NUMBER': 'asc'
        }
    };

    return output;

};

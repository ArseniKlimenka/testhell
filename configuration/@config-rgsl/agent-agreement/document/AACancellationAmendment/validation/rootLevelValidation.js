'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} cancellationDateRequired
 * @errorCode {errorCode} cancellationDateIsRequired
 * @errorCode {errorCode} cancellationDateShouldbeGreaterOrEqualToDocStartDate
 * @errorCode {errorCode} cancellationDateShouldbeLesserOrEqualToDocEndDate
 * @errorCode {errorCode} AmendmentManualDocumentNumberIsRequired
 * */
module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    if (!getValue(input, 'amendmentData.cancellationAmendmentData.manualDocumentNumber')) {

        validationErrors.push({
            errorCode: 'AmendmentManualDocumentNumberIsRequired',
            errorDataPath: '/Body/amendmentData/cancellationAmendmentData/manualDocumentNumber'
        });
    }

    const cancellationDate = getValue(input, 'validity.cancellationDate');

    if (!cancellationDate) {

        validationErrors.push({
            errorCode: 'cancellationDateRequired',
            errorDataPath: '/Body/validity/cancellationDate'
        });
    }
    else {

        const docEndDate = getValue(input, 'validity.endDate');
        const docStartDate = getValue(input, 'validity.startDate');
        const parsedDocumentEndDate = docEndDate ? Date.parse(docEndDate) : undefined;
        const parsedDocumentStartDate = docStartDate ? Date.parse(docStartDate) : undefined;

        const parsedCancellationDate = Date.parse(cancellationDate);

        if (parsedCancellationDate < parsedDocumentStartDate) {

            validationErrors.push({
                errorCode: 'cancellationDateShouldbeGreaterOrEqualToDocStartDate',
                errorDataPath: '/Body/validity//cancellationDate'
            });
        }

        if (parsedDocumentEndDate && (parsedCancellationDate > parsedDocumentEndDate)) {

            validationErrors.push({
                errorCode: 'cancellationDateShouldbeLesserOrEqualToDocEndDate',
                errorDataPath: '/Body/validity//cancellationDate'
            });
        }
    }

    return validationErrors;
};

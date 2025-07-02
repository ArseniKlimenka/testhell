'use strict';
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} openAmountOutdated
 */

function toApprovedValidation (body) {

    const validationErrors = [];

    const enrich = documents.getDocumentConfiguration("PaymentOrder", 1).processEnrichmentsFn;
    enrich(undefined, body, ['[GetNettedDocsData]']);

    const selectedContracts = body.paymentOrderNetting?.nettedDocuments ?? [];
    const actualData = body.tempTechnicalData?.nettedDocumentsData ?? [];
    const outdatedContracts = [];

    selectedContracts.forEach(doc => {

        const actualContractData = actualData.find(data => data.contractNumber === doc.documentNumber);

        if (!doc.isFutureContract &&
            (!actualContractData || (actualContractData.openAmount !== doc.initialOpenAmount && actualContractData.openAmount < doc.nettedAmount))) {

            outdatedContracts.push(doc.documentNumber);
        }
    });

    if (outdatedContracts.length > 0) {
        validationErrors.push({
            errorCode: 'openAmountOutdated',
            reference: {
                items: outdatedContracts.join()
            }
        });
    }

    return validationErrors;
}

module.exports = {
    toApprovedValidation,
};

'use strict';
/* eslint no-undef: "off"*/

function validateExisitngClaims(input, validationErrors) {


    const enrich = documents.getDocumentConfiguration("InsuredEvent", 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetRelatedClaims]']);

    const hasActiveClaims = input.body.tempTechnicalData?.hasActiveClaims ?? false;

    if (hasActiveClaims) {

        validationErrors.push({
            errorCode: 'insuredEventHasActiveClaims'
        });
    }
}

module.exports = {
    validateExisitngClaims
};

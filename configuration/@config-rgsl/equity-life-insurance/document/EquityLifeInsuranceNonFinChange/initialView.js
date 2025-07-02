'use strict';

/* eslint no-undef: "off"*/

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;

    if (!input.Body.selectedClaimRisks) {
        input.Body.selectedClaimRisks = [];
    }

    if (input.Body.selectedClaimRisks) {
        enrich(undefined, input.Body, ['/selectedClaimRisks[GetClaimSelectedRisks]']);
    }

    return input;
};

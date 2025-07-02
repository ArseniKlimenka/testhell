/* eslint no-undef: "off"*/

'use strict';

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;
    const contractVersions = input.Body?.contractVersions ?? [];

    if (contractVersions.length == 0) {
        enrich(undefined, input.Body, ['/contractVersions[SetContractVersions]']);
    }

    if (!input.Body.selectedClaimRisks) {
        input.Body.selectedClaimRisks = [];
    }

    if (input.Body.selectedClaimRisks) {
        enrich(undefined, input.Body, ['/selectedClaimRisks[GetClaimSelectedRisks]']);
    }

    return input;

};

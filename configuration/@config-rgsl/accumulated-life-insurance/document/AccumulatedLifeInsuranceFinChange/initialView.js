'use strict';

/* eslint no-undef: "off"*/

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;

    if (!input.Body.selectedClaimRisks) {
        input.Body.selectedClaimRisks = [];
    }

    if (input.Body.selectedClaimRisks) {
        enrich(undefined, input.Body, ['/selectedClaimRisks[GetClaimSelectedRisks]']);
    }

    const productCode = input.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.Body?.basicConditions?.issueDate || dateHelper.newDateAsString();

    if (!productCode || !issueDate) {

        return input;
    }

    const productConf = input.Body?.productConfiguration ?? {};
    input.ClientViewModel.insuranceRules = copyInsuranceRulesToClientViewModel(productConf);

    return input;
};

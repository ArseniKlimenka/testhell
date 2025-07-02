/* eslint no-undef: "off"*/

'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');
const { accidentLifeInsuranceQuoteDefaultValue } = require('@config-rgsl/accident-life-insurance/lib/accidentLifeConstants');

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;

    if (input.Body && !input.Number) {

        input.Body = deepCopy(accidentLifeInsuranceQuoteDefaultValue);
        input.Body.basicConditions.issueDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        input.Body.technicalInformation.creatorUsername = this.applicationContext.originatingUser.username;
        input.Body.technicalInformation.isCreatedByOperations = this.applicationContext.actor == 'Operations';

        // run data enrichment to set partner
        enrich(undefined, input.Body, ['/mainInsuranceConditions']);
        // run data enrichment to set initiator
        enrich(undefined, input.Body, ['/initiator']);

        enrich(undefined, input.Body, ['/basicConditions/sportTypes']);
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

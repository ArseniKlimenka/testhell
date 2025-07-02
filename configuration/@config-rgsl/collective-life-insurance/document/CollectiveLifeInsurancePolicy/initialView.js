/* eslint no-undef: "off"*/

'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;

    if (input.Body && !input.Number) {

        const collectiveLifeInsurancePolicyDefaultValue = {
            mainInsuranceConditions: {},
            basicConditions: {
                currency: {
                    currencyCode: 'RUB',
                    currencyDesc: 'Российский рубль',
                    currencyNumericCode: '643',
                }
            },
            additionalConditions: {
                coverageArea: 'весь мир, за исключением зон военных конфликтов и приравненных к ним территорий'
            },
            policyHolder: {
                participantType: 'policyHolder'
            },
            issueForm: {
                code: {
                    issueFormCode: 'paper',
                    issueFormDescription: 'Бумага'
                }
            },
            uwTriggers: [],
            triggersConditions: {},
            inquiriesList: {
                inquiresCheck: false
            },
            initiator: {},
            technicalInformation: {
                policyReviewNumber: 0,
                ratesOfReturn: []
            },
            productConfiguration: {}
        };

        input.Body = collectiveLifeInsurancePolicyDefaultValue;
        input.Body.basicConditions.issueDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        input.Body.technicalInformation.creatorUsername = this.applicationContext.originatingUser.username;
        input.Body.technicalInformation.isCreatedByOperations = this.applicationContext.actor == 'Operations';

        input.Body.attachmentsPackage = [];

        // run data enrichment to set partner
        enrich(undefined, input.Body, ['/mainInsuranceConditions']);

        // run data enrichment to set initiator
        enrich(undefined, input.Body, ['/initiator']);
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

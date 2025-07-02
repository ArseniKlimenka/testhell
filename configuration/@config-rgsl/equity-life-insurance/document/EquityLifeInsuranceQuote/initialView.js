/* eslint no-undef: "off"*/

'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

module.exports = function mapDetailsGetInitViewModel(input) {

    const enrich = documents.getDocumentConfiguration(input.ConfigurationCodeName, input.Version).processEnrichmentsFn;

    if (input.Body && !input.Number) {

        const equityLifeInsuranceQuoteDefaultValue = {
            mainInsuranceConditions: {},
            additionalServices: [],
            policyTerms: {},
            initiator: {},
            paymentPlan: [],
            basicConditions: {
                currency: {
                    currencyCode: 'RUB',
                    currencyDesc: 'Российский рубль',
                    currencyNumericCode: '643',
                },
                endowmentPaymentVariant: {
                    endowmentPaymentVariantCode: 'single',
                    endowmentPaymentVariantDescription: 'Единовременно'
                }
            },
            insuranceRules: {},
            policyHolder: {
                participantType: 'policyHolder'
            },
            insuredPerson: {
                participantType: 'insuredPerson',
                isPolicyHolder: false
            },
            issueForm: {},
            beneficiaries: {
                beneficiaries: []
            },
            declarationMedicalConfirmation: {},
            declarationMedical: [],
            declarationMainConfirmation: {},
            declarationMain: [],
            uwTriggers: [],
            triggersConditions: {},
            inquiriesList: {
                inquiresCheck: false
            },
            attachmentsPackage: [],
            technicalInformation: {
                ratesOfReturn: []
            },
            allocationInformation: [],
            risks: [],
            riskConditions: {},
            surrenderValues: [],
            equityStrategies: [],
            cumulation: {},
            commission: {},
            productConfiguration: {},
            additionalInvestmentParameters: {}
        };

        input.Body = deepCopy(equityLifeInsuranceQuoteDefaultValue);
        input.Body.basicConditions.issueDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
        input.Body.technicalInformation.creatorUsername = this.applicationContext.originatingUser.username;
        input.Body.technicalInformation.isCreatedByOperations = this.applicationContext.actor == 'Operations';

        // run data enrichment to set partner
        enrich(undefined, input.Body, ['/mainInsuranceConditions']);
        // run data enrichment to set initiator
        enrich(undefined, input.Body, ['/initiator']);

        const productCode = input.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = input.Body?.basicConditions?.issueDate || dateHelper.newDateAsString();

        if (!productCode || !issueDate) {
            return input;
        }

        const productConf = input.Body?.productConfiguration ?? {};
        input.ClientViewModel.insuranceRules = copyInsuranceRulesToClientViewModel(productConf);

    }

    return input;

};

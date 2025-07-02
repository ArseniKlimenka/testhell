module.exports = {

    accidentLifeInsuranceQuoteDefaultValue: {
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
            },
            paymentFrequency: {
                paymentFrequencyCode: '1',
                paymentFrequencyDescription: 'Единовременно'
            },
            sportTypes: {
                availableTypes: [],
                selectedTypes: []
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
        cumulation: {},
        commission: {},
        productConfiguration: {}
    },
};

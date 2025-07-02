module.exports = {

    creditLifeInsuranceQuoteDefaultValue: {
        mainInsuranceConditions: {},
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
            }
        },
        risks: [],
        riskConditions: {},
        risksCorrection: {},
        policyTerms: {},
        policyHolder: {
            participantType: 'policyHolder'
        },
        insuredPerson: {
            participantType: 'insuredPerson',
            isPolicyHolder: true
        },
        issueForm: {},
        beneficiaries: {
            beneficiaries: [],
            isHeritors: true,
            isNotHeritors: false
        },
        paymentPlan: [],
        insuranceRules: {},
        initiator: {},
        commission: {},
        creditContract: {},
        creditSalesPlace: {},
        creditProgram: {
            percentRateImpact: false
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
        surrenderValues: [],
        cumulation: {},
        productConfiguration: {}
    },
};

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {
    return {
        id: input.CONTRACT_NUMBER,
        stateCode: input.STATE,
        productGroup: input.PRODUCT_GROUP,
        productCode: input.PRODUCT_CODE,
        productDescription: input.PRODUCT_DESCRIPTION,
        productSalesSegment: input.PRODUCT_SALES_SEGMENT,
        issueDatePlain: input.ISSUE_DATE,
        issueDate: formatHelper.formatDateTimeToString(input.ISSUE_DATE),
        startDate: formatHelper.formatDateTimeToString(input.START_DATE),
        endDate: formatHelper.formatDateTimeToString(input.END_DATE),
        paymentFrequencyDescription: input.PAYMENT_FREQUENCY_DESC,
        riskPremium: input.RISK_PREMIUM ? round(input.RISK_PREMIUM, 2) : undefined,
        phFullName: input.PH_FULL_NAME,
        phEmail: input.PH_EMAIL,
        ipEmail: input.IP_EMAIL,
        initiatorName: input.INITIATOR_NAME,
        initiatorTabNumber: input.INITIATOR_TAB_NUMBER,
        businesCode: input.BUSINESS_CODE,
        subunitName: input.SUBUNIT_NAME,
        filailName: input.FILIAL_NAME,
        companyName: input.COMPANY_NAME,
        notSandartContract: input.NON_STANDART_CONTRACT,
        verifState: input.VERIF_STATE,
        verifErrorsList: input.VERIF_ERRORS_LIST,
        insuranceTerms: input.INSURANCE_TERMS,
        currencyDesc: input.CURRENCY,
        riskPremiumAll: input.RISK_PREMIUM_ALL ? round(input.RISK_PREMIUM_ALL, 2) : undefined,
        dob: formatHelper.formatDateTimeToString(input.DOB),
        coach: input.COACH,
        territorialChief: input.TERRITORIAL_CHIEF,
        regionalChief: input.REGIONAL_CHIEF,
        creditSum: input.CREDIT_SUM ? round(input.CREDIT_SUM, 2) : undefined,
        creditRate: input.CREDIT_RATE ? round(input.CREDIT_RATE, 4) : undefined,
        annuityPaymentSum: input.ANNUITY_PAYMENT_SUM ? round(input.ANNUITY_PAYMENT_SUM, 2) : undefined,
        creditProgramId: input.CREDIT_PROGRAM_ID,
        strategyDescriptionFull: input.STRATEGY_DESCRIPTION_FULL,
        manualRate: input.MANUAL_RATE,
        calculatedRate: input.CALCULATED_RATE
    };
};

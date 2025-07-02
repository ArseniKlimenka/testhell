'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    replaceBooleanTextWithNum,
    readyForDatabaseIssueDate,
    readyForDatabaseString,
    readyForDatabaseInt,
    readyForDatabaseFloat,
    readyForDatabaseBoolean,
    readyForDatabaseObject,
    readyForDatabaseArray,
    readyForDatabaseDate,
    readyForDatabaseIssueDateArray
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const {
    stringAttributesArr,
    intAttributesArr,
    floatAttributesArr,
    booleanAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr,
    dateAttributesArr
} = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    readyForDatabaseIssueDate(input, this);
    readyForDatabaseString(input, stringAttributesArr, this);
    readyForDatabaseInt(input, intAttributesArr, this);
    readyForDatabaseFloat(input, floatAttributesArr, this);
    readyForDatabaseBoolean(input, booleanAttributesArr, this);
    readyForDatabaseObject(input, objectAttributesArr, objectWrongAttributesArr, this);
    readyForDatabaseArray(input, arrayAttributesArr, this);
    readyForDatabaseDate(input, dateAttributesArr, this);
    readyForDatabaseIssueDateArray(input, this);

    const data = {
        excelRowNumber: input.$rowNumber,
        productCode: input.productCode,
        issueDateFrom: input.issueDateFrom,
        issueDateTo: input.issueDateTo,
        issueDateStr: input.issueDateStr,
        productDescription: input.productDescription,
        productGroupCode: input.productGroupCode,
        paymentFrequency: input.paymentFrequency,
        insuranceTerms: input.insuranceTerms,
        insuranceTermsMonths: input.insuranceTermsMonths,
        isWholeLife: input.isWholeLife,
        insuredIsPolicyHolder: input.insuredIsPolicyHolder,
        holderAgeOnStartDateMin: input.holderAgeOnStartDateMin,
        holderAgeOnStartDateMax: input.holderAgeOnStartDateMax,
        holderAgeOnStartDateMaxMandatoryAgreement: input.holderAgeOnStartDateMaxMandatoryAgreement,
        holderAgeOnEndDateMax: input.holderAgeOnEndDateMax,
        insuredAgeOnStartDateMin: input.insuredAgeOnStartDateMin,
        insuredAgeOnStartDateMax: input.insuredAgeOnStartDateMax,
        insuredAgeOnStartDateMandatoryAgreement: input.insuredAgeOnStartDateMandatoryAgreement,
        insuredAgeOnEndDateMax: input.insuredAgeOnEndDateMax,
        insuredAgeOnEndDateMaxMandatoryAgreement: input.insuredAgeOnEndDateMaxMandatoryAgreement,
        strategy: input.strategy,
        additionalServices: input.additionalServices,
        giftServices: input.giftServices,
        giftServicesPremium: input.giftServicesPremium,
        prefixOld: input.prefixOld,
        prefix: input.prefix,
        prefixByStrategyOld: input.prefixByStrategyOld,
        prefixByStrategy: input.prefixByStrategy,
        fixedPremiums: input.fixedPremiums,
        fixedInsuredSums: input.fixedInsuredSums,
        setFirstFixedInsuredSum: input.setFirstFixedInsuredSum,
        disableRiskInsuredSum: input.disableRiskInsuredSum,
        allowCalcFromPremium: input.allowCalcFromPremium,
        allowCalcFromInsuredSum: input.allowCalcFromInsuredSum,
        canHaveAdditionalRisks: input.canHaveAdditionalRisks,
        minRiskInsuredSum: input.minRiskInsuredSum,
        maxRiskInsuredSum: input.maxRiskInsuredSum,
        minPremium: input.minPremium,
        maxPremium: input.maxPremium,
        maxPremiumMandatoryAgreement: input.maxPremiumMandatoryAgreement,
        maxInsuredSumMainRisk: input.maxInsuredSumMainRisk,
        maxInsuredSumMainRiskMandatoryAgreement: input.maxInsuredSumMainRiskMandatoryAgreement,
        isPaidUpAvailable: input.isPaidUpAvailable,
        ruleCode: input.ruleCode,
        daysBetweenIssueAndStart: input.daysBetweenIssueAndStart,
        payPeriodDays: input.payPeriodDays,
        gracePeriodDays: input.gracePeriodDays,
        coolOffPeriodDays: input.coolOffPeriodDays,
        partnerBusinessCode: input.partnerBusinessCode,
        riskPackages: input.riskPackages,
        useThreePayments: input.useThreePayments,
        activeFrom: input.activeFrom,
        activeTo: input.activeTo,
        paperTypes: input.paperTypes,
        applicationPrintout: input.applicationPrintout,
        policyPrintout: input.policyPrintout,
        cashBackCoeff: input.cashBackCoeff,
        showFinKnowledgeQuestionnaire: input.showFinKnowledgeQuestionnaire,
        isReinvestAvailable: input.isReinvestAvailable,
        isReinvestFieldsAvailable: input.isReinvestFieldsAvailable,
        invoiceOnActivationIfReinvest: input.invoiceOnActivationIfReinvest,
        daysBetweenIssueAndStartReinvest: input.daysBetweenIssueAndStartReinvest,
        payPeriodDaysReinvest: input.payPeriodDaysReinvest,
        creditPrograms: input.creditPrograms,
        availableCurrencies: input.availableCurrencies,
        isMigrated: input.isMigrated,
        guaranteedIncome: input.guaranteedIncome,
        availablePaymentFrequency: input.availablePaymentFrequency,
        policyHolderType: input.policyHolderType,
        cardType: input.cardType,
        cumulationProductGroup: input.cumulationProductGroup,
        insuranceTermsDays: input.insuranceTermsDays,
        numOfWorkDaysToInvest: input.numOfWorkDaysToInvest,
        mf: input.mf,
        coolOffDIDRate: input.coolOffDIDRate,
        isProductLinkedToAsset: input.isProductLinkedToAsset,
        didType: input.didType,
        consentToDataTransferingFNS: input.consentToDataTransferingFNS
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};

'use strict';

const {
    readyForExcelString,
    readyForExcelBoolean,
    convertArrayDate,
    readyForExcelSingleDate
} = require('@config-rgsl/life-insurance/lib/excelExportHelper');

const {
    stringAttributesArr,
    dateAttributesArr,
    booleanAttributesArr,
    issueDateStrConst
} = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

const emptyText = '';

module.exports = function resultMapping(input) {

    const stringAttributes = [...stringAttributesArr, ...dateAttributesArr];
    readyForExcelString(input, stringAttributes);
    readyForExcelBoolean(input, booleanAttributesArr);
    convertArrayDate(input, issueDateStrConst);
    readyForExcelSingleDate(input, dateAttributesArr);

    const result = input.data.map((item, index) => {

        const resultData = item.resultData;

        return {
            ruleNumber: index + 1 ?? emptyText,
            productCode: resultData.productCode ?? emptyText,
            issueDate: resultData.issueDateStr ?? emptyText,
            productDescription: resultData.productDescription ?? emptyText,
            productGroupCode: resultData.productGroupCode ?? emptyText,
            paymentFrequency: resultData.paymentFrequency ?? emptyText,
            insuranceTerms: resultData.insuranceTerms ?? emptyText,
            insuranceTermsMonths: resultData.insuranceTermsMonths ?? emptyText,
            isWholeLife: resultData.isWholeLife ?? emptyText,
            insuredIsPolicyHolder: resultData.insuredIsPolicyHolder ?? emptyText,
            holderAgeOnStartDateMin: resultData.holderAgeOnStartDateMin ?? emptyText,
            holderAgeOnStartDateMax: resultData.holderAgeOnStartDateMax ?? emptyText,
            holderAgeOnStartDateMaxMandatoryAgreement: resultData.holderAgeOnStartDateMaxMandatoryAgreement ?? emptyText,
            holderAgeOnEndDateMax: resultData.holderAgeOnEndDateMax ?? emptyText,
            insuredAgeOnStartDateMin: resultData.insuredAgeOnStartDateMin ?? emptyText,
            insuredAgeOnStartDateMax: resultData.insuredAgeOnStartDateMax ?? emptyText,
            insuredAgeOnStartDateMandatoryAgreement: resultData.insuredAgeOnStartDateMandatoryAgreement ?? emptyText,
            insuredAgeOnEndDateMax: resultData.insuredAgeOnEndDateMax ?? emptyText,
            insuredAgeOnEndDateMaxMandatoryAgreement: resultData.insuredAgeOnEndDateMaxMandatoryAgreement ?? emptyText,
            strategy: resultData.strategy ?? emptyText,
            additionalServices: resultData.additionalServices ?? emptyText,
            giftServices: resultData.giftServices ?? emptyText,
            giftServicesPremium: resultData.giftServicesPremium ?? emptyText,
            prefixOld: resultData.prefixOld ?? emptyText,
            prefix: resultData.prefix ?? emptyText,
            prefixByStrategyOld: resultData.prefixByStrategyOld ?? emptyText,
            prefixByStrategy: resultData.prefixByStrategy ?? emptyText,
            fixedPremiums: resultData.fixedPremiums ?? emptyText,
            fixedInsuredSums: resultData.fixedInsuredSums ?? emptyText,
            setFirstFixedInsuredSum: resultData.setFirstFixedInsuredSum ?? emptyText,
            disableRiskInsuredSum: resultData.disableRiskInsuredSum ?? emptyText,
            allowCalcFromPremium: resultData.allowCalcFromPremium ?? emptyText,
            allowCalcFromInsuredSum: resultData.allowCalcFromInsuredSum ?? emptyText,
            canHaveAdditionalRisks: resultData.canHaveAdditionalRisks ?? emptyText,
            minRiskInsuredSum: resultData.minRiskInsuredSum ?? emptyText,
            maxRiskInsuredSum: resultData.maxRiskInsuredSum ?? emptyText,
            minPremium: resultData.minPremium ?? emptyText,
            maxPremium: resultData.maxPremium ?? emptyText,
            maxPremiumMandatoryAgreement: resultData.maxPremiumMandatoryAgreement ?? emptyText,
            maxInsuredSumMainRisk: resultData.maxInsuredSumMainRisk ?? emptyText,
            maxInsuredSumMainRiskMandatoryAgreement: resultData.maxInsuredSumMainRiskMandatoryAgreement ?? emptyText,
            isPaidUpAvailable: resultData.isPaidUpAvailable ?? emptyText,
            ruleCode: resultData.ruleCode ?? emptyText,
            daysBetweenIssueAndStart: resultData.daysBetweenIssueAndStart ?? emptyText,
            payPeriodDays: resultData.payPeriodDays ?? emptyText,
            gracePeriodDays: resultData.gracePeriodDays ?? emptyText,
            coolOffPeriodDays: resultData.coolOffPeriodDays ?? emptyText,
            partnerBusinessCode: resultData.partnerBusinessCode ?? emptyText,
            riskPackages: resultData.riskPackages ?? emptyText,
            useThreePayments: resultData.useThreePayments ?? emptyText,
            activeFrom: resultData.activeFrom ?? emptyText,
            activeTo: resultData.activeTo ?? emptyText,
            paperTypes: resultData.paperTypes ?? emptyText,
            applicationPrintout: resultData.applicationPrintout ?? emptyText,
            policyPrintout: resultData.policyPrintout ?? emptyText,
            cashBackCoeff: resultData.cashBackCoeff ?? emptyText,
            showFinKnowledgeQuestionnaire: resultData.showFinKnowledgeQuestionnaire ?? emptyText,
            isReinvestAvailable: resultData.isReinvestAvailable ?? emptyText,
            isReinvestFieldsAvailable: resultData.isReinvestFieldsAvailable ?? emptyText,
            invoiceOnActivationIfReinvest: resultData.invoiceOnActivationIfReinvest ?? emptyText,
            daysBetweenIssueAndStartReinvest: resultData.daysBetweenIssueAndStartReinvest ?? emptyText,
            payPeriodDaysReinvest: resultData.payPeriodDaysReinvest ?? emptyText,
            creditPrograms: resultData.creditPrograms ?? emptyText,
            availableCurrencies: resultData.availableCurrencies ?? emptyText,
            isMigrated: resultData.isMigrated ?? emptyText,
            guaranteedIncome: resultData.guaranteedIncome ?? emptyText,
            availablePaymentFrequency: resultData.availablePaymentFrequency ?? emptyText,
            policyHolderType: resultData.policyHolderType ?? emptyText,
            cardType: resultData.cardType ?? emptyText,
            cumulationProductGroup: resultData.cumulationProductGroup ?? emptyText,
            insuranceTermsDays: resultData.insuranceTermsDays ?? emptyText,
            numOfWorkDaysToInvest: resultData.numOfWorkDaysToInvest ?? emptyText,
            mf: resultData.mf ?? emptyText,
            consentToDataTransferingFNS: resultData.consentToDataTransferingFNS ?? emptyText,
            coolOffDIDRate: resultData.coolOffDIDRate ?? emptyText,
            isProductLinkedToAsset: resultData.isProductLinkedToAsset ?? emptyText,
            didType: resultData.didType ?? emptyText
        };
    });

    return result;

};

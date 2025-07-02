'use strict';

const {
    LocalDateTime
} = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = productConfigurations[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        PRODUCT_CODE: lineData.productCode,
        ISSUE_DATE_FROM: lineData.issueDateFrom,
        ISSUE_DATE_TO: lineData.issueDateTo,
        ISSUE_DATE_STR: lineData.issueDateStr,
        PRODUCT_DESCRIPTION: lineData.productDescription,
        PRODUCT_GROUP_CODE: lineData.productGroupCode,
        PAYMENT_FREQUENCY: lineData.paymentFrequency,
        INSURANCE_TERMS: lineData.insuranceTerms,
        INSURANCE_TERMS_MONTHS: lineData.insuranceTermsMonths,
        IS_WHOLE_LIFE: lineData.isWholeLife,
        INSURED_IS_POLICY_HOLDER: lineData.insuredIsPolicyHolder,
        HOLDER_AGE_ON_START_DATE_MIN: lineData.holderAgeOnStartDateMin,
        HOLDER_AGE_ON_START_DATE_MAX: lineData.holderAgeOnStartDateMax,
        HOLDER_AGE_ON_START_DATE_MAX_MA: lineData.holderAgeOnStartDateMaxMandatoryAgreement,
        HOLDER_AGE_ON_END_DATE_MAX: lineData.holderAgeOnEndDateMax,
        INSURED_AGE_ON_START_DATE_MIN: lineData.insuredAgeOnStartDateMin,
        INSURED_AGE_ON_START_DATE_MAX: lineData.insuredAgeOnStartDateMax,
        INSURED_AGE_ON_START_DATE_MA: lineData.insuredAgeOnStartDateMandatoryAgreement,
        INSURED_AGE_ON_END_DATE_MAX: lineData.insuredAgeOnEndDateMax,
        INSURED_AGE_ON_END_DATE_MAX_MA: lineData.insuredAgeOnEndDateMaxMandatoryAgreement,
        STRATEGY: lineData.strategy,
        ADDITIONAL_SERVICES: lineData.additionalServices,
        GIFT_SERVICES: lineData.giftServices,
        GIFT_SERVICES_PREMIUM: lineData.giftServicesPremium,
        PREFIX_OLD: lineData.prefixOld,
        PREFIX: lineData.prefix,
        PREFIX_BY_STRATEGY_OLD: lineData.prefixByStrategyOld,
        PREFIX_BY_STRATEGY: lineData.prefixByStrategy,
        FIXED_PREMIUMS: lineData.fixedPremiums,
        FIXED_INSURED_SUMS: lineData.fixedInsuredSums,
        SET_FIRST_FIXED_INSURED_SUM: lineData.setFirstFixedInsuredSum,
        DISABLE_RISK_INSURED_SUM: lineData.disableRiskInsuredSum,
        ALLOW_CALC_FROM_PREMIUM: lineData.allowCalcFromPremium,
        ALLOW_CALC_FROM_INSURED_SUM: lineData.allowCalcFromInsuredSum,
        CAN_HAVE_ADDITIONAL_RISKS: lineData.canHaveAdditionalRisks,
        MIN_RISK_INSURED_SUM: lineData.minRiskInsuredSum,
        MAX_RISK_INSURED_SUM: lineData.maxRiskInsuredSum,
        MIN_PREMIUM: lineData.minPremium,
        MAX_PREMIUM: lineData.maxPremium,
        MAX_PREMIUM_MA: lineData.maxPremiumMandatoryAgreement,
        MAX_INSURED_SUM_MAIN_RISK: lineData.maxInsuredSumMainRisk,
        MAX_INSURED_SUM_MAIN_RISK_MA: lineData.maxInsuredSumMainRiskMandatoryAgreement,
        IS_PAID_UP_AVAILABLE: lineData.isPaidUpAvailable,
        RULE_CODE: lineData.ruleCode,
        DAYS_BETWEEN_ISSUE_AND_START: lineData.daysBetweenIssueAndStart,
        PAY_PERIOD_DAYS: lineData.payPeriodDays,
        GRACE_PERIOD_DAYS: lineData.gracePeriodDays,
        COOL_OFF_PERIOD_DAYS: lineData.coolOffPeriodDays,
        PARTNER_BUSINESS_CODE: lineData.partnerBusinessCode,
        RISK_PACKAGES: lineData.riskPackages,
        USE_THREE_PAYMENTS: lineData.useThreePayments,
        ACTIVE_FROM: lineData.activeFrom,
        ACTIVE_TO: lineData.activeTo,
        PAPER_TYPES: lineData.paperTypes,
        APPLICATION_PRINTOUT: lineData.applicationPrintout,
        POLICY_PRINTOUT: lineData.policyPrintout,
        CASH_BACK_COEFFICIENT: lineData.cashBackCoeff,
        SHOW_FIN_KNOW_QUEST: lineData.showFinKnowledgeQuestionnaire,
        IS_REINVEST_AVAILABLE: lineData.isReinvestAvailable,
        IS_REINVEST_FIELDS_AVAILABLE: lineData.isReinvestFieldsAvailable,
        INVOICE_ON_ACTIVATION_IF_REINVEST: lineData.invoiceOnActivationIfReinvest,
        DAYS_BETWEEN_ISSUE_AND_START_REINVEST: lineData.daysBetweenIssueAndStartReinvest,
        PAY_PERIOD_DAYS_REINVEST: lineData.payPeriodDaysReinvest,
        CREDIT_PROGRAMS: lineData.creditPrograms,
        AVAILABLE_CURRENCIES: lineData.availableCurrencies,
        IS_MIGRATED: lineData.isMigrated,
        GUARANTEED_INCOME: lineData.guaranteedIncome,
        AVAILABLE_PAYMENT_FREQUENCY: lineData.availablePaymentFrequency,
        POLICY_HOLDER_TYPE: lineData.policyHolderType,
        CARD_TYPE: lineData.cardType,
        CUMULATION_PRODUCT_GROUP: lineData.cumulationProductGroup,
        INSURANCE_TERMS_DAYS: lineData.insuranceTermsDays,
        NUM_OF_WORKING_DAYS_TO_INVEST: lineData.numOfWorkDaysToInvest,
        MF: lineData.mf,
        COOL_OFF_DID_RATE: lineData.coolOffDIDRate,
        IS_PRODUCT_LINKED_TO_ASSET: lineData.isProductLinkedToAsset,
        DID_TYPE: lineData.didType,
        CONSENT_TO_DATA_TRANSFERING_FNS: lineData.consentToDataTransferingFNS,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.PRODUCT_CONF': [recordStatus]
    };

};

'use strict';

const {
    arrayAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr
} = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const {
    objectToString
} = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function resultMapping(input) {

    const output = {};

    const attributesToString = [...arrayAttributesArr, ...objectAttributesArr, ...objectWrongAttributesArr];
    objectToString(input, attributesToString);

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.issueDateFrom = input.ISSUE_DATE_FROM;
    output.issueDateTo = input.ISSUE_DATE_TO;
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.productDescription = input.PRODUCT_DESCRIPTION;
    output.productGroupCode = input.PRODUCT_GROUP_CODE;
    output.paymentFrequency = input.PAYMENT_FREQUENCY;
    output.insuranceTerms = input.INSURANCE_TERMS;
    output.insuranceTermsMonths = input.INSURANCE_TERMS_MONTHS;
    output.isWholeLife = input.IS_WHOLE_LIFE;
    output.insuredIsPolicyHolder = input.INSURED_IS_POLICY_HOLDER;
    output.holderAgeOnStartDateMin = input.HOLDER_AGE_ON_START_DATE_MIN;
    output.holderAgeOnStartDateMax = input.HOLDER_AGE_ON_START_DATE_MAX;
    output.holderAgeOnStartDateMaxMandatoryAgreement = input.HOLDER_AGE_ON_START_DATE_MAX_MA;
    output.holderAgeOnEndDateMax = input.HOLDER_AGE_ON_END_DATE_MAX;
    output.insuredAgeOnStartDateMin = input.INSURED_AGE_ON_START_DATE_MIN;
    output.insuredAgeOnStartDateMax = input.INSURED_AGE_ON_START_DATE_MAX;
    output.insuredAgeOnStartDateMandatoryAgreement = input.INSURED_AGE_ON_START_DATE_MA;
    output.insuredAgeOnEndDateMax = input.INSURED_AGE_ON_END_DATE_MAX;
    output.insuredAgeOnEndDateMaxMandatoryAgreement = input.INSURED_AGE_ON_END_DATE_MAX_MA;
    output.strategy = input.STRATEGY;
    output.additionalServices = input.ADDITIONAL_SERVICES;
    output.giftServices = input.GIFT_SERVICES;
    output.giftServicesPremium = input.GIFT_SERVICES_PREMIUM;
    output.prefixOld = input.PREFIX_OLD;
    output.prefix = input.PREFIX;
    output.prefixByStrategyOld = input.PREFIX_BY_STRATEGY_OLD;
    output.prefixByStrategy = input.PREFIX_BY_STRATEGY;
    output.fixedPremiums = input.FIXED_PREMIUMS;
    output.fixedInsuredSums = input.FIXED_INSURED_SUMS;
    output.setFirstFixedInsuredSum = input.SET_FIRST_FIXED_INSURED_SUM;
    output.disableRiskInsuredSum = input.DISABLE_RISK_INSURED_SUM;
    output.allowCalcFromPremium = input.ALLOW_CALC_FROM_PREMIUM;
    output.allowCalcFromInsuredSum = input.ALLOW_CALC_FROM_INSURED_SUM;
    output.canHaveAdditionalRisks = input.CAN_HAVE_ADDITIONAL_RISKS;
    output.minRiskInsuredSum = input.MIN_RISK_INSURED_SUM;
    output.maxRiskInsuredSum = input.MAX_RISK_INSURED_SUM;
    output.minPremium = input.MIN_PREMIUM;
    output.maxPremium = input.MAX_PREMIUM;
    output.maxPremiumMandatoryAgreement = input.MAX_PREMIUM_MA;
    output.maxInsuredSumMainRisk = input.MAX_INSURED_SUM_MAIN_RISK;
    output.maxInsuredSumMainRiskMandatoryAgreement = input.MAX_INSURED_SUM_MAIN_RISK_MA;
    output.isPaidUpAvailable = input.IS_PAID_UP_AVAILABLE;
    output.ruleCode = input.RULE_CODE;
    output.daysBetweenIssueAndStart = input.DAYS_BETWEEN_ISSUE_AND_START;
    output.payPeriodDays = input.PAY_PERIOD_DAYS;
    output.gracePeriodDays = input.GRACE_PERIOD_DAYS;
    output.coolOffPeriodDays = input.COOL_OFF_PERIOD_DAYS;
    output.partnerBusinessCode = input.PARTNER_BUSINESS_CODE;
    output.riskPackages = input.RISK_PACKAGES;
    output.useThreePayments = input.USE_THREE_PAYMENTS;
    output.activeFrom = input.ACTIVE_FROM;
    output.activeTo = input.ACTIVE_TO;
    output.paperTypes = input.PAPER_TYPES;
    output.applicationPrintout = input.APPLICATION_PRINTOUT;
    output.policyPrintout = input.POLICY_PRINTOUT;
    output.cashBackCoeff = input.CASH_BACK_COEFFICIENT;
    output.showFinKnowledgeQuestionnaire = input.SHOW_FIN_KNOW_QUEST;
    output.isReinvestAvailable = input.IS_REINVEST_AVAILABLE;
    output.isReinvestFieldsAvailable = input.IS_REINVEST_FIELDS_AVAILABLE;
    output.invoiceOnActivationIfReinvest = input.INVOICE_ON_ACTIVATION_IF_REINVEST;
    output.daysBetweenIssueAndStartReinvest = input.DAYS_BETWEEN_ISSUE_AND_START_REINVEST;
    output.payPeriodDaysReinvest = input.PAY_PERIOD_DAYS_REINVEST;
    output.creditPrograms = input.CREDIT_PROGRAMS;
    output.availableCurrencies = input.AVAILABLE_CURRENCIES;
    output.isMigrated = input.IS_MIGRATED;
    output.guaranteedIncome = input.GUARANTEED_INCOME;
    output.availablePaymentFrequency = input.AVAILABLE_PAYMENT_FREQUENCY;
    output.policyHolderType = input.POLICY_HOLDER_TYPE;
    output.cardType = input.CARD_TYPE;
    output.cumulationProductGroup = input.CUMULATION_PRODUCT_GROUP;
    output.insuranceTermsDays = input.INSURANCE_TERMS_DAYS;
    output.numOfWorkDaysToInvest = input.NUM_OF_WORKING_DAYS_TO_INVEST;
    output.consentToDataTransferingFNS = input.CONSENT_TO_DATA_TRANSFERING_FNS;
    output.mf = input.MF;
    output.coolOffDIDRate = input.COOL_OFF_DID_RATE;
    output.isProductLinkedToAsset = input.IS_PRODUCT_LINKED_TO_ASSET;
    output.didType = input.DID_TYPE;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};

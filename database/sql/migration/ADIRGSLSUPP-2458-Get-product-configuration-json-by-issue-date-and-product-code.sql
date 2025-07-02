DECLARE @productConfiguration NVARCHAR(MAX);
DECLARE @productCode NVARCHAR(255) = 'PRODUCT_CODE';
DECLARE @issueDate NVARCHAR(255) = 'ISSUE_DATE';

SET
    @productConfiguration = (
        SELECT
            EXCEL_ROW_NUMBER AS excelRowNumber,
            PRODUCT_CODE AS productCode,
            ISSUE_DATE_FROM AS issueDateFrom,
            ISSUE_DATE_TO AS issueDateTo,
            ISSUE_DATE_STR AS issueDateStr,
            PRODUCT_DESCRIPTION AS productDescription,
            PRODUCT_GROUP_CODE AS productGroupCode,
            JSON_QUERY(PAYMENT_FREQUENCY) AS paymentFrequency,
            JSON_QUERY(INSURANCE_TERMS) AS insuranceTerms,
            JSON_QUERY(INSURANCE_TERMS_MONTHS) AS insuranceTermsMonths,
            IS_WHOLE_LIFE AS isWholeLife,
            INSURED_IS_POLICY_HOLDER AS insuredIsPolicyHolder,
            HOLDER_AGE_ON_START_DATE_MIN AS holderAgeOnStartDateMin,
            HOLDER_AGE_ON_START_DATE_MAX AS holderAgeOnStartDateMax,
            HOLDER_AGE_ON_START_DATE_MAX_MA AS holderAgeOnStartDateMaxMandatoryAgreement,
            HOLDER_AGE_ON_END_DATE_MAX AS holderAgeOnEndDateMax,
            INSURED_AGE_ON_START_DATE_MIN AS insuredAgeOnStartDateMin,
            JSON_QUERY(INSURED_AGE_ON_START_DATE_MAX) AS insuredAgeOnStartDateMax,
            INSURED_AGE_ON_START_DATE_MA AS insuredAgeOnStartDateMandatoryAgreement,
            JSON_QUERY(INSURED_AGE_ON_END_DATE_MAX) AS insuredAgeOnEndDateMax,
            JSON_QUERY(INSURED_AGE_ON_END_DATE_MAX_MA) AS insuredAgeOnEndDateMaxMandatoryAgreement,
            JSON_QUERY(STRATEGY) AS strategy,
            JSON_QUERY(ADDITIONAL_SERVICES) AS additionalServices,
            JSON_QUERY(GIFT_SERVICES) AS giftServices,
            GIFT_SERVICES_PREMIUM AS giftServicesPremium,
            PREFIX_OLD AS prefixOld,
            JSON_QUERY(PREFIX) AS prefix,
            JSON_QUERY(PREFIX_BY_STRATEGY_OLD) AS prefixByStrategyOld,
            JSON_QUERY(PREFIX_BY_STRATEGY) AS prefixByStrategy,
            JSON_QUERY(FIXED_PREMIUMS) AS fixedPremiums,
            JSON_QUERY(FIXED_INSURED_SUMS) AS fixedInsuredSums,
            SET_FIRST_FIXED_INSURED_SUM AS setFirstFixedInsuredSum,
            DISABLE_RISK_INSURED_SUM AS disableRiskInsuredSum,
            ALLOW_CALC_FROM_PREMIUM AS allowCalcFromPremium,
            ALLOW_CALC_FROM_INSURED_SUM AS allowCalcFromInsuredSum,
            CAN_HAVE_ADDITIONAL_RISKS AS canHaveAdditionalRisks,
            JSON_QUERY(MIN_RISK_INSURED_SUM) AS minRiskInsuredSum,
            JSON_QUERY(MAX_RISK_INSURED_SUM) AS maxRiskInsuredSum,
            JSON_QUERY(MIN_PREMIUM) AS minPremium,
            JSON_QUERY(MAX_PREMIUM) AS maxPremium,
            JSON_QUERY(MAX_PREMIUM_MA) AS maxPremiumMandatoryAgreement,
            MAX_INSURED_SUM_MAIN_RISK AS maxInsuredSumMainRisk,
            MAX_INSURED_SUM_MAIN_RISK_MA AS maxInsuredSumMainRiskMandatoryAgreement,
            IS_PAID_UP_AVAILABLE AS isPaidUpAvailable,
            RULE_CODE AS ruleCode,
            JSON_QUERY(DAYS_BETWEEN_ISSUE_AND_START) AS daysBetweenIssueAndStart,
            PAY_PERIOD_DAYS AS payPeriodDays,
            GRACE_PERIOD_DAYS AS gracePeriodDays,
            COOL_OFF_PERIOD_DAYS AS coolOffPeriodDays,
            PARTNER_BUSINESS_CODE AS partnerBusinessCode,
            JSON_QUERY(RISK_PACKAGES) AS riskPackages,
            USE_THREE_PAYMENTS AS useThreePayments,
            ACTIVE_FROM AS activeFrom,
            ACTIVE_TO AS activeTo,
            JSON_QUERY(PAPER_TYPES) AS paperTypes,
            APPLICATION_PRINTOUT AS applicationPrintout,
            POLICY_PRINTOUT AS policyPrintout,
            JSON_QUERY(CASH_BACK_COEFFICIENT) AS cashBackCoeff,
            SHOW_FIN_KNOW_QUEST AS showFinKnowledgeQuestionnaire,
            IS_REINVEST_AVAILABLE AS isReinvestAvailable,
            IS_REINVEST_FIELDS_AVAILABLE AS isReinvestFieldsAvailable,
            INVOICE_ON_ACTIVATION_IF_REINVEST AS invoiceOnActivationIfReinvest,
            JSON_QUERY(DAYS_BETWEEN_ISSUE_AND_START_REINVEST) AS daysBetweenIssueAndStartReinvest,
            PAY_PERIOD_DAYS_REINVEST AS payPeriodDaysReinvest,
            JSON_QUERY(CREDIT_PROGRAMS) AS creditPrograms,
            JSON_QUERY(AVAILABLE_CURRENCIES) AS availableCurrencies,
            IS_MIGRATED AS isMigrated,
            JSON_QUERY(GUARANTEED_INCOME) AS guaranteedIncome,
            JSON_QUERY(AVAILABLE_PAYMENT_FREQUENCY) AS availablePaymentFrequency,
            POLICY_HOLDER_TYPE AS policyHolderType,
            CARD_TYPE AS cardType,
            CUMULATION_PRODUCT_GROUP AS cumulationProductGroup,
            DID_TYPE AS didType,
            IS_PRODUCT_LINKED_TO_ASSET AS isProductLinkedToAsset,
            INSURANCE_TERMS_DAYS AS insuranceTermsDays,
            NUM_OF_WORKING_DAYS_TO_INVEST AS numOfWorkDaysToInvest,
            MF AS mf,
            IMPORT_DOCUMENT_ID AS importDocumentId,
            CONF_VERSION AS version,
            LOADED_BY AS loadedBy,
            LOAD_DATE AS loadDate
        FROM
            BFX_IMPL.PRODUCT_CONF
        WHERE
            PRODUCT_CODE = @productCode
            AND @issueDate >= ISSUE_DATE_FROM
            AND @issueDate <= ISSUE_DATE_TO
            AND CONF_VERSION = (
                SELECT
                    MAX(CONF_VERSION) MAX_VERSION
                FROM
                    BFX_IMPL.PRODUCT_CONF
            ) FOR JSON AUTO,
            WITHOUT_ARRAY_WRAPPER
    );

PRINT '"productConfiguration": ' + @productConfiguration
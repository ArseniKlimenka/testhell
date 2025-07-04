'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {
    const jsonData = input.JSON_DATA ? JSON.parse(input.JSON_DATA) : {};
    return {
        actId: input.ACT_ID,
        actItemId: input.ACT_ITEM_ID,
        actItemIds: JSON.parse(input.ACT_ITEM_IDS),
        statusId: input.STATUS_ID,
        actStateCode: input.ACT_STATE_CODE,
        reportingPeriodFrom: input.REPORTING_PERIOD_FROM,
        reportingPeriodTo: input.REPORTING_PERIOD_TO,
        issueDate: input.ISSUE_DATE,
        actNo: input.ACT_NO,
        agentAgreementNumber: input.AGENT_AGREEMENT_NUMBER,
        aaExternalNumber: jsonData.aaExternalNumber,
        agentName: jsonData.agentName,
        referenceNo: input.REFERENCE_NO,
        stateCode: input.STATE,
        polHolderName: jsonData.polHolderName,
        productCode: jsonData.productCode,
        productDesc: jsonData.productDesc,
        creditProgramVersion: jsonData.creditProgramVersion,
        sourceLineId: input.SOURCE_LINE_ID,
        insuredYearsCount: jsonData.insuredYearsCount,
        paymentPeriod: jsonData.paymentPeriod,
        insuranceYear: jsonData.insuranceYear,
        polStartDate: jsonData.polStartDate,
        polEndDate: jsonData.polEndDate,
        riskPremiumYear: jsonData.riskPremiumYear,
        paymentFrequencyCode: jsonData.paymentFrequencyCode,
        riskPremium: jsonData.riskPremium,
        paymentFrequency2Code: jsonData.paymentFrequency2Code,
        docCurrencyCode: input.DOC_CURRENCY_CODE,
        installmentType: jsonData.installmentType,
        paymentTransactionDate: input.PAYMENT_TRANSACTION_DATE,
        paymentLcAmount: input.PAYMENT_LC_AMOUNT,
        dueDate: input.DUE_DATE,
        aaCommRate: input.AA_COMM_RATE,
        aaDocCommRate: input.AA_DOC_COMM_RATE,
        aaCommLcAmountCalc: input.AA_COMM_LC_AMOUNT_CALC,
        aaDocCommLcAmountCalc: input.AA_DOC_COMM_LC_AMOUNT_CALC,
        commRateManual: input.COMM_RATE_MANUAL,
        lcCommAmountManual: input.LC_COMM_AMOUNT_MANUAL,
        lcCommAmountExtra: input.LC_COMM_AMOUNT_EXTRA,
        lcCommAmountFinal: input.LC_COMM_AMOUNT_FINAL,
        isManualRate: input.IS_MANUAL_RATE,
        vatLc: input.VAT_LC,
        invCommRate: input.INV_COMM_FINAL_RATE,
        invCommLcAmount: input.INV_COMM_LC_AMOUNT,
        verificationState: translationUtils.getTranslation('document/LifeInsuranceAttachmentVerification/1', 'states', null, input.VERIFICATION_STATE),
        businessLine: jsonData.businessLine,
        cancellationIssueDate: input.CANCELLATION_ISSUE_DATE,
        cancellationCreatedOn: input.CANCELLATION_CREATED_ON,
        paymentDocAmount: input.PAYMENT_DOC_AMOUNT,
        aaCommDocAmountCalc: input.AA_COMM_DOC_AMOUNT_CALC,
        invCommDocAmount: input.INV_COMM_DOC_AMOUNT,
        docCommRate: input.DOC_COMM_RATE,
        stateCodeDescription: translationUtils.getTranslation(`document/${input.CODE_NAME}/1`, 'states', null, input.STATE),
        configurationName: input.CODE_NAME,
        commRateFinal: input.COMM_RATE_FINAL,
        lcCommAmountCalc: input.LC_COMM_AMOUNT_CALC,
        expensesRate: input.EXPENSES_RATE,
        expensesAmount: input.EXPENSES_AMOUNT,
        naturalPersonRate: input.NATURAL_PERSON_RATE,
        naturalPersonAmount: input.NATURAL_PERSON_AMOUNT,
        solePropriatorRate: input.SOLE_PROPRIATOR_RATE,
        solePropriatorAmount: input.SOLE_PROPRIATOR_AMOUNT,
        subAgentSadNumber: jsonData.subAgentSadNumber,
        subAgentType: jsonData.subAgentType,
        subAgentBranchName: jsonData.subAgentBranchName,
        subAgentBranchRegion: jsonData.subAgentBranchRegion,
        productGroup: jsonData.productGroup,
        initiatorOrgunitCode: jsonData.initiatorOrgunitCode,
        notes: input.NOTES,
        hasNoChanges: input.HAS_NO_CHANGES,
        amendmentReason: input.AMENDMENT_REASON,
        subAgentAmounts: jsonData.subAgentAmounts,
        subAgentProportion: jsonData.subAgentProportion,
        subAgentSplitShare: jsonData.subAgentSplitShare,
        subAgentSplitAmount: jsonData.subAgentSplitAmount,
        manualRule: input.MANUAL_RULE ? `${input.MANUAL_RULE} ${input.MANUAL_RULE_DESCRIPTION}` : 'Нет'
    };
};

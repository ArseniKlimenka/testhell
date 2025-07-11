'use strict';

module.exports = function resultMapping(input) {
    return {
        actId: input.ACT_ID,
        actItemId: input.ACT_ITEM_ID,
        savedJsonData: input.SAVED_JSON_DATA ? JSON.parse(input.SAVED_JSON_DATA) : undefined,
        newJsonData: {
            aaExternalNumber: input.AA_EXTERNAL_NUMBER,
            agentName: input.AGENT_NAME,
            stateCode: input.STATE,
            polHolderName: input.HOLDER_NAME,
            productCode: input.PRODUCT_CODE,
            productDesc: input.PRODUCT_DESC,
            creditProgramVersion: input.PROGRAM_VERSION,
            insuredYearsCount: input.INSURED_YEARS_COUNT,
            paymentPeriod: input.PAYMENT_PERIOD,
            insuranceYear: input.INSURANCE_YEAR,
            polStartDate: input.POL_START_DATE,
            polEndDate: input.POL_END_DATE,
            riskPremiumYear: input.RISK_PREMIUM_YEAR,
            paymentFrequencyCode: input.PAYMENT_FREQUENCY_CODE,
            riskPremium: input.RISK_PREMIUM,
            paymentFrequency2Code: input.PAYMENT_FREQUENCY2_CODE,
            installmentType: input.INSTALLMENT_TYPE,
            verificationState: input.VERIFICATION_STATE,
            businessLine: input.BUSINESS_LINE,
            cancellationIssueDate: input.CANCELLATION_ISSUE_DATE,
            cancellationCreatedOn: input.CANCELLATION_CREATED_ON,
            configurationName: input.CODE_NAME,
            subAgentSadNumber: input.SUB_AGENT_SAD_NUMBER,
            subAgentType: input.SUB_AGENT_TYPE,
            subAgentBranchName: input.SUB_AGENT_BRANCH_NAME,
            subAgentBranchRegion: input.SUB_AGENT_BRANCH_REGION,
            productGroup: input.PRODUCT_GROUP,
            initiatorOrgunitCode: input.INITIATOR_ORGUNIT_CODE,
            hasNoChanges: input.HAS_NO_CHANGES,
            amendmentReason: input.AMENDMENT_REASON,
            subAgentAmounts: input.SUB_AGENT_AMOUNTS,
            subAgentProportion: input.SUB_AGENT_SPLIT_PROPORTION,
            subAgentSplitShare: input.SUB_AGENT_SPLIT_SHARE,
            subAgentSplitAmount: input.SUB_AGENT_SPLIT_AMOUNT,
        },
    };
};

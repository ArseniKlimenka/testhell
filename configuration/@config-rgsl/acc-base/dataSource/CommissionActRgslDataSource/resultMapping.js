const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function resultMapping(input) {
    const partyConf = input.PARTY_CONFIGURATION;

    return {
        actId: input.ACT_ID,
        actNo: input.ACT_NO,
        lastUpdated: input.LAST_UPDATED,
        actIssueDate: input.ISSUE_DATE,
        payDate: input.PAY_DATE,
        originalReceiptDate: input.ORIGINAL_RECEIPT_DATE,
        actTypeId: input.ACT_TYPE_ID,
        statusId: input.STATUS_ID,
        stateCode: input.STATE_CODE,
        aaServiceProviderCode: input.AGENT_SERVICE_PROVIDER_CODE,
        aaServiceProviderName: partyConf ? (partyConf.toString() === partyConstants.partyType.LegalEntity ? input.AGENT_SHORT_NAME : input.AGENT_FULL_NAME) : '',
        aaNumber: input.AGENT_AGREEMENT_NUMBER,
        aaName: input.AGENT_AGREEMENT_NAME,
        agentPersonalNumber: input.AGENT_PERSONAL_NUMBER,
        agentBusinessCode: input.AGENT_BUSINESS_CODE,
        periodFrom: input.PERIOD_FROM,
        periodTo: input.PERIOD_TO,
        reportingPeriodFrom: input.REPORTING_PERIOD_FROM,
        reportingPeriodTo: input.REPORTING_PERIOD_TO,
        premiumAmountLc: input.PREMIUM_AMOUNT_LC,
        itemsCount: input.ITEMS_COUNT,
        commAmountLc: input.COMM_AMOUNT_LC,
        vatRate: input.VAT_RATE,
        vatAmountLc: input.VAT_AMOUNT_LC,
        notes: input.NOTES,
        isDocCorrect: input.IS_DOC_CORRECT,
        productGroupInclude: input.PRODUCT_GROUP_INCLUDE,
        productGroupExclude: input.PRODUCT_GROUP_EXCLUDE,
        productsInclude: input.PRODUCTS_INCLUDE?.map(_ => _.CODE),
        productsExclude: input.PRODUCTS_EXCLUDE?.map(_ => _.CODE),
    };
};

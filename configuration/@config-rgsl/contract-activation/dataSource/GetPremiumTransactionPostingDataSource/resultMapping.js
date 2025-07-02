module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        mainContractNumber: input.MAIN_CONTRACT_NUMBER,
        maxPPLoadDate: input.MAX_PP_LOAD_DATE,
        newPostedUntilDate: input.NEW_POSTED_UNTIL_DATE,
        postingDate: input.POSTING_DATE,
        polcyStartDate: input.POLICY_START_DATE,
        amendmentValidFrom: input.AMENDMENT_VALID_FROM,
        itemNo: input.ITEM_NO,
        amount: input.AMOUNT,
        paidAmount: input.PAID_AMOUNT,
        currencyCode: input.CURRENCY_CODE,
        policyHolderCode: input.POLICY_HOLDER_CODE,
        tradingPartnerCode: input.TRADING_PARTNER_CODE,
    };
};


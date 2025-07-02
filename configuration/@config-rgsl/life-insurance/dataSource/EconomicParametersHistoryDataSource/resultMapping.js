'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.productConfNumber = input.PRODUCT_CONF_NUMBER;
    output.ruleNum = input.RULE_NUM;
    output.segment = input.SEGMENT;
    output.isin = input.ISIN;
    output.rko = input.RKO;
    output.motivationFromMargin = input.MOTIVATION_FROM_MARGIN;
    output.motivationFromProductEconomic = input.MOTIVATION_FROM_PRODUCT_ECONOMIC;
    output.skMargin = input.SK_MARGIN;
    output.fundingRateSwaps = input.FUNDING_RATE_SWAPS;
    output.laps = input.LAPS;
    output.hedge = input.HEDGE;
    output.clientID = input.CLIENT_ID;
    output.shareRF = input.SHARE_RF;
    output.shareGF = input.SHARE_GF;
    output.rvd = input.RVD;
    output.fundingVersionSubFundID = input.FUNDING_VER_SUB_FUND_ID;
    output.memorandumPkDate = input.MEMORANDUM_PK_DATE;
    output.pkNumber = input.PK_NUMBER;
    output.analyticalAdjustment = input.ANALYTICAL_ADJUSTMENT;
    output.expectedReturnPercentAK = input.EXPECTED_RETURN_PERCENT_AK;
    output.insurance = input.INSURANCE;
    output.riskTransferProduct = input.RISK_TRANSFER_PRODUCT;
    output.comments = input.COMMENTS;
    output.isManualCorrection = input.IS_MANUAL_CORRECTION;
    output.triggeredByUsername = input.TRIGGERED_BY_USERNAME;
    output.loadDate = input.LOAD_DATE;

    return output;
};

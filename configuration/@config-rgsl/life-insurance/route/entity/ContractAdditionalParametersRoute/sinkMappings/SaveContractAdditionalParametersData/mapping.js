'use strict';

module.exports = function contractAdditionalParametersMapping(input) {

    const code = input.code;
    const triggeredByUsername = input.triggeredByUsername;
    const body = input.body;

    const economicParameters = body.economicParameters ?? [];
    const receivedDocuments = body.receivedDocuments ?? {};
    const quoteNumber = body.quote?.number;
    const policyNumber = body.policy?.number;

    const result = {

        'BFX_IMPL.ADDITIONAL_PARAMETERS_HUB': [{
            DOCUMENT_NUMBER: code
        }],

        'BFX_IMPL.ADDITIONAL_PARAMETERS_SAT': [{
            DOCUMENT_NUMBER: code,
            PRODUCT_CONF_NUMBER: economicParameters.productConfNumber,
            RULE_NUM: economicParameters.ruleNum,
            SEGMENT: economicParameters.segment,
            ISIN: economicParameters.isin,
            RKO: economicParameters.rko,
            MOTIVATION_FROM_MARGIN: economicParameters.motivationFromMargin,
            MOTIVATION_FROM_PRODUCT_ECONOMIC: economicParameters.motivationFromProductEconomic,
            SK_MARGIN: economicParameters.skMargin,
            FUNDING_RATE_SWAPS: economicParameters.fundingRateSwaps,
            LAPS: economicParameters.laps,
            HEDGE: economicParameters.hedge,
            CLIENT_ID: economicParameters.clientID,
            SHARE_RF: economicParameters.shareRF,
            SHARE_GF: economicParameters.shareGF,
            RVD: economicParameters.rvd,
            FUNDING_VER_SUB_FUND_ID: economicParameters.fundingVersionSubFundID,
            MEMORANDUM_PK_DATE: economicParameters.memorandumPkDate,
            PK_NUMBER: economicParameters.pkNumber,
            ANALYTICAL_ADJUSTMENT: economicParameters.analyticalAdjustment,
            EXPECTED_RETURN_PERCENT_AK: economicParameters.expectedReturnPercentAK,
            INSURANCE: economicParameters.insurance,
            RISK_TRANSFER_PRODUCT: economicParameters.riskTransferProduct,
            COMMENTS: economicParameters.comments,
            IS_MANUAL_CORRECTION: economicParameters.isManualCorrection,
            TRIGGERED_BY_USERNAME: triggeredByUsername,
            HAS_AMENDMENT: receivedDocuments.hasAmendment,
            HAS_AMENDMENT_DATE: receivedDocuments.hasAmendmentDate,
            HAS_PAYMENT_INTERMEDIATE_APPLICATION: receivedDocuments.hasPaymentIntermediateApplication,
            PAYMENT_INTERMEDIATE_APPLICATION_DATE: receivedDocuments.paymentIntermediateApplicationDate,
            ORIGINAL_RECEIPT_DATE: receivedDocuments.originalReceiptDate
        }],

        'BFX_IMPL.ADDITIONAL_PARAMETERS_QUOTE_LINK': quoteNumber ? [
            {
                DOCUMENT_NUMBER: code,
                CONTRACT_NUMBER: quoteNumber
            }
        ] : [],

        'BFX_IMPL.ADDITIONAL_PARAMETERS_POLICY_LINK': policyNumber ? [
            {
                DOCUMENT_NUMBER: code,
                CONTRACT_NUMBER: policyNumber
            }
        ] : [],

    };

    return result;
};

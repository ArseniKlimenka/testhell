'use strict';

module.exports = function productConfigurationMapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}) {

    const productCode = body?.mainConditions?.insuranceProduct?.productCode;
    const economicParameters = body?.economicParameters ?? [];

    const result = {

        'UNIV_IMPL.PRODUCT_CONF_HUB': [{
            PRODUCT_CONF_NUMBER: number
        }],

        'UNIV_IMPL.ECONOMIC_PARAMETER_HUB': [{
            PRODUCT_CONF_NUMBER: number
        }],

        'UNIV_IMPL.PRODUCT_CONF_SAT': [{
            PRODUCT_CONF_NUMBER: number,
            PRODUCT_CODE: productCode
        }],

        'UNIV_IMPL.ECONOMIC_PARAMETER_SAT': []

    };

    if (economicParameters && economicParameters.length > 0) {

        economicParameters.forEach(economicParameter => {

            result['UNIV_IMPL.ECONOMIC_PARAMETER_SAT'].push({
                PRODUCT_CONF_NUMBER: number,
                PRODUCT_CODE: productCode,
                RULE_NUM: economicParameter.ruleNum,
                ISSUE_DATE_START: economicParameter.policyIssueDateStart,
                ISSUE_DATE_END: economicParameter.policyIssueDateEnd,
                INSURANCE_TERM_FROM: economicParameter.insuranceTermFrom?.insuranceTermsYearCode,
                INSURANCE_TERM_TO: economicParameter.insuranceTermTo?.insuranceTermsYearCode,
                PARTNER_CODE: economicParameter.partner?.partnerCode,
                PARTNER_BUSINESS_CODE: economicParameter.partner?.partnerBusinessCode,
                AGENT_AGREEMENT_ID: economicParameter.agentAgreement?.id,
                AGENT_AGREEMENT_NUMBER: economicParameter.agentAgreement?.number,
                AGENT_AGREEMENT_MANUAL_NUMBER: economicParameter.agentAgreement?.manualNumber,
                AGENT_AGREEMENT_EXT_NUMBER: economicParameter.agentAgreement?.externalNumber,
                AGENT_AGREEMENT_COMM_RATE: economicParameter.commRate ? economicParameter.commRate / 100 : economicParameter.commRate,
                CURRENCY_CODE: economicParameter.currency?.currencyCode,
                PAYMENT_FREQUENCY_CODE: economicParameter.paymentFrequency?.paymentFrequencyCode,
                GUARANTEE_INCOME_CODE: economicParameter.guaranteedIncome?.guaranteedIncomeCode,
                ROR_ISSUE_DATE_FROM: economicParameter.ratesOfReturn?.issueDateFrom,
                ROR_ISSUE_DATE_TO: economicParameter.ratesOfReturn?.issueDateTo,
                ROR_STRATEGY_CODE: economicParameter.ratesOfReturn?.strategyCode,
                ROR_INSURANCE_TERMS: economicParameter.ratesOfReturn?.insuranceTerms,
                ROR_CURRENCY_CODE: economicParameter.ratesOfReturn?.currencyCode,
                ROR_GUARANTEE_INCOME_CODE: economicParameter.ratesOfReturn?.guaranteedIncome,
                ROR_RATE_OF_RETURN: economicParameter.ratesOfReturn?.rateOfReturn,
                ROR_MANUAL_RATE: economicParameter.ratesOfReturn?.manualRate,
                BIP_STRATEGY_CODE: economicParameter.basicInvestmentParameters?.strategyCode,
                BIP_STRATEGY_DESCRIPTION: economicParameter.basicInvestmentParameters?.strategyDescription,
                SC_ISSUE_DATE_FROM: economicParameter.strategyConfiguration?.issueDateFrom,
                SC_ISSUE_DATE_TO: economicParameter.strategyConfiguration?.issueDateTo,
                SC_OPTION_PRICE: economicParameter.strategyConfiguration?.optionPrice,
                SC_FIX_RATE: economicParameter.strategyConfiguration?.fixRate,
                SC_PARTICIPATION_COEFF: economicParameter.strategyConfiguration?.participationCoeff,
                SC_CURRENCY_CODE: economicParameter.strategyConfiguration?.currencyCode,
                SEGMENT: economicParameter.segment,
                ISIN: economicParameter.isin,
                RKO: economicParameter.rko,
                MOTIVATION_FROM_MARGIN: economicParameter.motivationFromMargin,
                MOTIVATION_FROM_PRODUCT_ECONOMIC: economicParameter.motivationFromProductEconomic,
                SK_MARGIN: economicParameter.skMargin,
                FUNDING_RATE_SWAPS: economicParameter.fundingRateSwaps,
                LAPS: economicParameter.laps,
                HEDGE: economicParameter.hedge,
                CLIENT_ID: economicParameter.clientID,
                SHARE_RF: economicParameter.shareRF,
                SHARE_GF: economicParameter.shareGF,
                RVD: economicParameter.rvd,
                FUNDING_VER_SUB_FUND_ID: economicParameter.fundingVersionSubFundID,
                MEMORANDUM_PK_DATE: economicParameter.memorandumPkDate,
                PK_NUMBER: economicParameter.pkNumber,
                ANALYTICAL_ADJUSTMENT: economicParameter.analyticalAdjustment,
                EXPECTED_RETURN_PERCENT_AK: economicParameter.expectedReturnPercentAK,
                INSURANCE: economicParameter.insurance,
                RISK_TRANSFER_PRODUCT: economicParameter.riskTransferProduct,
                COMMENTS: economicParameter.comments,
            });
        });

    }

    return result;
};

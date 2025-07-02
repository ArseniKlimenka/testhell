'use strict';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    sequenceNumber,
    versionState
}) {

    const productCodesList = body?.strategyConfiguration?.productCodes || [];
    const strategyCode = body?.strategyConfiguration?.strategyCode;
    const issueDateMin = body?.strategyConfiguration?.issueDateMin;
    const issueDateMax = body?.strategyConfiguration?.issueDateMax;
    const strategyDescriptionFull = body?.strategyConfiguration?.strategyDescriptionFull;
    const payOffDescription = body?.strategyConfiguration?.payOffDescription;
    const baseActiveDescription = body?.strategyConfiguration?.baseActiveDescription;
    const participationCoeff = body?.strategyConfiguration?.participationCoeff;
    const participationCoeffByPeriods = body?.strategyConfiguration?.participationCoeffByPeriods;
    const optionPrice = body?.strategyConfiguration?.optionPrice;
    const barrier = body?.strategyConfiguration?.barrier;
    const barrierAutoCall = body?.strategyConfiguration?.barrierAutoCall;
    const emitent = body?.strategyConfiguration?.emitent;
    const fixRate = body?.strategyConfiguration?.fixRate;
    const intialShare = body?.strategyConfiguration?.intialShare;
    const hedgeCost = body?.strategyConfiguration?.hedgeCost;
    const spreadBA = body?.strategyConfiguration?.spreadBA;
    const payOffShortDescription = body?.strategyConfiguration?.payOffShortDescription;
    const toolType = body?.strategyConfiguration?.toolType;
    const measureToolNominal = body?.strategyConfiguration?.measureToolNominal;
    const calculatingAgent = body?.strategyConfiguration?.calculatingAgent;
    const priceOfMeasureTool = body?.strategyConfiguration?.priceOfMeasureTool;
    const partOfPremiumForTool = body?.strategyConfiguration?.partOfPremiumForTool;

    const strategyConfigurationSat = [{
        $deleted: true,
        STRATEGY_CONFIGURATION_NUMBER: number
    }];

    productCodesList.map(productCode => {
        strategyConfigurationSat.push({
            PRODUCT_CODE: productCode,
            STRATEGY_CONFIGURATION_NUMBER: number,
            STRATEGY_CODE: strategyCode,
            ISSUE_DATE_MIN: issueDateMin,
            ISSUE_DATE_MAX: issueDateMax,
            STRATEGY_DESCRIPTION_FULL: strategyDescriptionFull,
            PAYOFF_DESCRIPTION: payOffDescription,
            BASE_ACTIVE_DESCRIPTION: baseActiveDescription,
            PARTICIPATION_COEFF: participationCoeff,
            PARTICIPATION_COEFF_BY_PERIODS: participationCoeffByPeriods,
            OPTION_PRICE: optionPrice,
            BARRIER: barrier,
            BARRIER_AUTO_CALL: barrierAutoCall,
            EMITENT: emitent,
            FIX_RATE: fixRate,
            INITIAL_SHARE: intialShare,
            HEDGE_COST: hedgeCost,
            SPREAD_BA: spreadBA,
            PAY_OFF_SHORT_DESCRIPTION: payOffShortDescription,
            STATE: state,
            TOOLTYPE: toolType,
            MEASURETOOLNOMINAL: measureToolNominal,
            CALCULATINGAGENT: calculatingAgent,
            PRICEOFMEASURETOOL: priceOfMeasureTool,
            PARTOFPREMIUMFORTOOL: partOfPremiumForTool
        });
    });

    return {
        'PAS_IMPL.STRATEGY_CONFIGURATION_HUB': [{
            STRATEGY_CONFIGURATION_NUMBER: number
        }],
        'PAS_IMPL.STRATEGY_CONFIGURATION_SAT': strategyConfigurationSat
    };

};

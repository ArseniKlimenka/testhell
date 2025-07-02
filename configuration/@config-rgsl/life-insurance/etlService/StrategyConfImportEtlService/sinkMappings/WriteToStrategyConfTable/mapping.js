'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const strategyConfigs = additionalDataSourcesResults?.GetStrategyConfDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = strategyConfigs[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        PRODUCT_CODE: lineData.productCode,
        STRATEGY_CODE: lineData.strategyCode,
        ISSUE_DATE_FROM : lineData.issueDateFrom,
        ISSUE_DATE_TO : lineData.issueDateTo,
        ISSUE_DATE_STR : lineData.issueDateStr,
        CURRENCY_CODE: lineData.currencyCode,
        PRODUCT_DESCRIPTION: lineData.productDescription,
        STRATEGY_DESCRIPTION_FULL: lineData.strategyDescriptionFull,
        PAY_OFF_DESCRIPTION: lineData.payOffDescription,
        BASE_ACTIVE_DESCRIPTION: lineData.baseActiveDescription,
        PARTICIPATION_COEFF: lineData.participationCoeff,
        PARTICIPATION_COEFF_BY_PERIODS: lineData.participationCoeffByPeriods,
        OPTION_PRICE: lineData.optionPrice,
        BARRIER: lineData.barrier,
        BARRIER_AUTO_CALL: lineData.barrierAutoCall,
        EMITENT: lineData.emitent,
        FIX_RATE: lineData.fixRate,
        INTIAL_SHARE: lineData.intialShare,
        HEDGE_COST: lineData.hedgeCost,
        SPREAD_B_A: lineData.spreadBA,
        PAY_OFF_SHORT_DESCRIPTION: lineData.payOffShortDescription,
        TOOL_TYPE: lineData.toolType,
        MEASURE_TOOL_NOMINAL: lineData.measureToolNominal,
        CALCULATING_AGENT: lineData.calculatingAgent,
        PRICE_OF_MEASURE_TOOL: lineData.priceOfMeasureTool,
        PART_OF_PREMIUM_FOR_TOOL: lineData.partOfPremiumForTool,
        DISCOUNT: lineData.discount,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.STRATEGY_CONF': [recordStatus]
    };

};

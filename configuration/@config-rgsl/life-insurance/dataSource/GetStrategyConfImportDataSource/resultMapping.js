'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.strategyCode = input.STRATEGY_CODE;
    output.issueDateFrom = input.ISSUE_DATE_FROM;
    output.issueDateTo = input.ISSUE_DATE_TO;
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.productCode = input.PRODUCT_CODE;
    output.currencyCode = input.CURRENCY_CODE;
    output.productDescription = input.PRODUCT_DESCRIPTION;
    output.strategyDescriptionFull = input.STRATEGY_DESCRIPTION_FULL;
    output.payOffDescription = input.PAY_OFF_DESCRIPTION;
    output.baseActiveDescription = input.BASE_ACTIVE_DESCRIPTION;
    output.participationCoeff = input.PARTICIPATION_COEFF;
    output.participationCoeffByPeriods = input.PARTICIPATION_COEFF_BY_PERIODS;
    output.optionPrice = input.OPTION_PRICE;
    output.barrier = input.BARRIER;
    output.barrierAutoCall = input.BARRIER_AUTO_CALL;
    output.emitent = input.EMITENT;
    output.fixRate = input.FIX_RATE;
    output.intialShare = input.INTIAL_SHARE;
    output.hedgeCost = input.HEDGE_COST;
    output.spreadBA = input.SPREAD_B_A;
    output.payOffShortDescription = input.PAY_OFF_SHORT_DESCRIPTION;
    output.toolType = input.TOOL_TYPE;
    output.measureToolNominal = input.MEASURE_TOOL_NOMINAL;
    output.calculatingAgent = input.CALCULATING_AGENT;
    output.priceOfMeasureTool = input.PRICE_OF_MEASURE_TOOL;
    output.partOfPremiumForTool = input.PART_OF_PREMIUM_FOR_TOOL;
    output.discount = input.DISCOUNT;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};

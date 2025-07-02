'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

const {
    objectAttributesArr,
    objectWrongAttributesArr,
    arrayAttributesArr
} = require('@config-rgsl/life-insurance/lib/strategyConfHelper');

const {
    parseJSONconfig
} = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.strategyCode = input.STRATEGY_CODE;
    output.issueDateFrom = DateTimeUtils.formatDate(input.ISSUE_DATE_FROM, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.issueDateTo = DateTimeUtils.formatDate(input.ISSUE_DATE_TO, DateTimeUtils.DateFormats.ECMASCRIPT);
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

    const attributesToParse = [...objectAttributesArr, ...objectWrongAttributesArr, ...arrayAttributesArr];
    parseJSONconfig(output, attributesToParse);

    return output;
};

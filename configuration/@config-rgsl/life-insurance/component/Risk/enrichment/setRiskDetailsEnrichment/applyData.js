const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const riskUtils = require('@config-rgsl/life-insurance/lib/riskUtils');
const riskStartDateHelper = require('@config-rgsl/life-insurance/lib/riskStartDateCalc');
const riskEndDateHelper = require('@config-rgsl/life-insurance/lib/riskEndDateCalc');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse || !dataSourceResponse.data || dataSourceResponse.data.length == 0) { return; }

    // get data from dataSource
    const resultData = dataSourceResponse.data[0].resultData;

    // set basic data
    input.risk.riskShortDescription = input.risk.riskShortDescription || resultData.riskShortDescription;
    input.risk.riskFullDescription = input.risk.riskFullDescription || resultData.riskFullDescription;
    input.risk.isLife = input.risk.isLife || resultData.isLife;
    input.risk.riskOrder = input.risk.riskOrder || resultData.riskOrder;
    input.risk.riskPerson = input.risk.riskPerson || resultData.riskPerson;
    input.risk.riskProgram = input.risk.riskProgram || resultData.riskProgram;
    input.risk.withoutProduct = input.risk.withoutProduct || resultData.withoutProduct;
    input.risk.risksGroup = input.risk.risksGroup || resultData.risksGroup;

    // calc risk dates
    const conditionsFunction = resultData.conditionsFunction;
    const body = getValue(this, 'businessContext.rootData');
    const riskConditions = riskUtils.getBodyContext(body);
    const riskStartDateFunctionReference = conditionsFunction && getValue(riskStartDateHelper, conditionsFunction);
    const riskStartDate = riskStartDateFunctionReference ? riskStartDateFunctionReference(riskConditions) : riskConditions.contractSartDate;
    const riskEndDateFunctionReference = conditionsFunction && getValue(riskEndDateHelper, conditionsFunction);
    const riskEndDate = riskEndDateFunctionReference ? riskEndDateFunctionReference(riskConditions) : riskConditions.contractEndDate;
    input.startDate = input.startDate || riskStartDate;
    input.endDate = input.endDate || riskEndDate;

};

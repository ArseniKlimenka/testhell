'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this?.businessContext?.rootData;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const investmentStrategyDescription = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyDescription;
    const rateOfReturn = body?.basicInvestmentParameters?.rateOfReturn;
    const rateOfReturnPercent = rateOfReturn ? rateOfReturn * 100 : undefined;
    const insuranceTerms = body?.basicConditions?.insuranceTerms;
    const guaranteedIncomeCode = body?.basicConditions?.guaranteedIncome?.guaranteedIncomeCode;
    const isAnnualTerm = guaranteedIncomeCode == lifeInsuranceConstants.guaranteedIncome.annual.code;

    let strategyConf = {};

    if (dataSourceResponse.data?.length > 0) {
        strategyConf = dataSourceResponse.data[0].resultData;
    }

    if (!investmentStrategyDescription) {
        body.basicInvestmentParameters.investmentStrategy.investmentStrategyDescription = strategyConf.strategyDescriptionFull;
    }

    let fixRate = strategyConf.fixRate;
    let participationCoeff = strategyConf.participationCoeff;

    if (rateOfReturn) {

        if (!lifeInsuranceConstants.productGroupArray.RATE_OF_RETURN_BASIS_ACTIVE.includes(productCode)) {
            fixRate = rateOfReturnPercent;
        }

        participationCoeff = isAnnualTerm ? rateOfReturn : insuranceTerms * rateOfReturn;

        if (lifeInsuranceConstants.productGroupArray.RATE_OF_RETURN_BASIS_ACTIVE.includes(productCode)) {
            participationCoeff = rateOfReturn;
        }
    }

    body.basicInvestmentParameters.investmentStrategyDescriptionFull = strategyConf.strategyDescriptionFull;
    body.basicInvestmentParameters.payOffDescription = strategyConf.payOffDescription;
    body.basicInvestmentParameters.baseActiveDescription = strategyConf.baseActiveDescription;
    body.basicInvestmentParameters.participationCoeff = participationCoeff;
    body.basicInvestmentParameters.optionPrice = strategyConf.optionPrice;
    body.basicInvestmentParameters.barrier = strategyConf.barrier;
    body.basicInvestmentParameters.barrierAutoCall = strategyConf.barrierAutoCall;
    body.basicInvestmentParameters.participationCoeffByPeriods = strategyConf.participationCoeffByPeriods;
    body.basicInvestmentParameters.emitent = strategyConf.emitent;
    body.basicInvestmentParameters.fixRate = fixRate;
    body.basicInvestmentParameters.intialShare = strategyConf.intialShare;
    body.basicInvestmentParameters.hedgeCost = strategyConf.hedgeCost;
    body.basicInvestmentParameters.spreadBA = strategyConf.spreadBA;
    body.basicInvestmentParameters.payOffShortDescription = strategyConf.payOffShortDescription;
    body.basicInvestmentParameters.toolType = strategyConf.toolType;
    body.basicInvestmentParameters.measureToolNominal = strategyConf.measureToolNominal;
    body.basicInvestmentParameters.calculatingAgent = strategyConf.calculatingAgent;
    body.basicInvestmentParameters.priceOfMeasureTool = strategyConf.priceOfMeasureTool;
    body.basicInvestmentParameters.partOfPremiumForTool = strategyConf.partOfPremiumForTool;
    body.basicInvestmentParameters.discount = strategyConf.discount;

};

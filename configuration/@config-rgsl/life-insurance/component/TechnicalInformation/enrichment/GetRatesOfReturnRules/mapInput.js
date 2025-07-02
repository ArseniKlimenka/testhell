'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const strategyCode = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
    const issueDate = body?.basicConditions?.issueDate;
    const insuranceTerms = body?.basicConditions?.insuranceTerms;
    const currencyCode = body?.basicConditions?.currency?.currencyCode;
    const guaranteedIncome = body?.basicConditions?.guaranteedIncome?.guaranteedIncomeCode;

    if (!productCode || !issueDate) { return null; }

    const output = {
        data: {
            criteria: {
                maxVersion: true,
                productCode,
                strategyCode,
                issueDate,
                insuranceTerms,
                currencyCode,
                guaranteedIncome
            }
        }
    };

    return output;
};

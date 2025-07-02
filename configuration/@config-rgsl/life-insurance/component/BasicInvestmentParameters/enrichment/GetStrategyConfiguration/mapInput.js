'use strict';

module.exports = function mapInput(input) {

    const body = input.context?.Body || this.businessContext?.rootData;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const currencyCode = body?.basicConditions?.currency?.currencyCode;
    const isManualSetInvestmentParams = body?.basicInvestmentParameters?.isManualSetInvestmentParams;
    const strategyCode = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;

    if (strategyCode && !isManualSetInvestmentParams) {

        return {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    strategyCode,
                    issueDate,
                    currencyCode
                }
            }
        };
    }

    return null;
};

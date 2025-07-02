'use strict';

module.exports = function mapInput(input) {

    const body = input.context?.Body || this.businessContext?.rootData;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const isManualSetInvestmentParams = body?.basicInvestmentParameters?.isManualSetInvestmentParams;
    const strategyCode = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;

    if (strategyCode && !isManualSetInvestmentParams) {

        return {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    strategyCode,
                    issueDate
                }
            }
        };
    }

    return null;
};

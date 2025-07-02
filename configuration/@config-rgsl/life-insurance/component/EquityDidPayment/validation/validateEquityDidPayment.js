
'use strict';

/**
* @errorCode {errorCode} availableSumLessThanRequiredSum
*/
module.exports = function validateEquityDidPayment(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const requiredSum = body?.equityDidPayment?.requiredSum;
    const availableSum = body?.equityDidPayment?.availableSum;
    const investmentAccountValue = body?.equityDidPayment?.investmentAccountValue;

    if (availableSum < requiredSum) {
        validationErrors.push({
            errorCode: "availableSumLessThanRequiredSum",
            errorDataPath: '/availableSum'
        });
    }

    if (availableSum > (investmentAccountValue * 0.95)) {
        validationErrors.push({
            errorCode: "availableSumMoreThanInvestmentAccountValue",
            errorDataPath: '/availableSum'
        });
    }

    return validationErrors;

};

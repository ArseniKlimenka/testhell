'use strict';

module.exports = function equityStrategyRequestMapping(input) {

    const body = input?.rootContext?.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode ?? body?.contract?.productCode;
    const payOffType = input?.rowContext?.payOffType;

    if (productCode) {
        return {
            data: {
                criteria: {
                    productCode,
                    payOffType
                }
            }
        };
    }

};
